// Hai nhà cung cấp cho /api/interpret: Anthropic API (dùng cho triển khai thật) và Claude CLI (chạy cục bộ,
// dùng phiên đăng nhập sẵn có của máy). Cả hai trả về cùng một generator các đoạn chữ.
import 'server-only';
import { spawn } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import type { ChatMessage } from './request';
import { readLines, textToSseStream } from './sse';

export type Provider = 'anthropic' | 'cli';

export class ProviderError extends Error {
  constructor(readonly kind: 'busy' | 'upstream') { super(kind); }
}

const TIMEOUT_MS = 120_000;
const INTERRUPTED = '\n\n[Luận giải bị gián đoạn, vui lòng thử lại.]';

/** INTERPRET_PROVIDER chọn rõ nhà cung cấp; không đặt thì dùng Anthropic nếu có API key. Giá trị lạ hoặc thiếu cấu hình -> null (từ chối). */
export function resolveProvider(env: Record<string, string | undefined> = process.env): Provider | null {
  const explicit = env.INTERPRET_PROVIDER?.trim();
  if (explicit === 'cli') return 'cli';
  if (explicit === 'anthropic') return env.ANTHROPIC_API_KEY ? 'anthropic' : null;
  if (!explicit && env.ANTHROPIC_API_KEY) return 'anthropic';
  return null;
}

/** Bóc chữ từ các sự kiện SSE của Anthropic Messages API. */
export async function* anthropicTexts(body: ReadableStream<Uint8Array>): AsyncGenerator<string> {
  for await (const line of readLines(body)) {
    if (!line.startsWith('data: ')) continue;
    let ev: { type?: string; delta?: { type?: string; text?: string } };
    try { ev = JSON.parse(line.slice(6)); } catch { continue; }
    if (ev.type === 'error') throw new ProviderError('upstream');
    if (ev.type === 'content_block_delta' && ev.delta?.type === 'text_delta' && ev.delta.text) yield ev.delta.text;
    if (ev.type === 'message_stop') return;
  }
}

async function* anthropic(system: string, messages: ChatMessage[], signal: AbortSignal): AsyncGenerator<string> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new ProviderError('upstream');
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({
      model: process.env.INTERPRET_MODEL?.trim() || 'claude-sonnet-5',
      max_tokens: 4096,
      stream: true,
      system,
      messages,
    }),
    signal,
  });
  if (!res.ok || !res.body) {
    await res.body?.cancel().catch(() => {});
    throw new ProviderError('upstream');
  }
  yield* anthropicTexts(res.body);
}

/** Bóc chữ từ các dòng stream-json của `claude -p`. */
export function cliTextOf(line: string): { delta?: string; result?: string } {
  let ev: { type?: string; event?: { type?: string; delta?: { type?: string; text?: string } }; result?: unknown; is_error?: boolean };
  try { ev = JSON.parse(line); } catch { return {}; }
  if (ev.type === 'stream_event' && ev.event?.type === 'content_block_delta' && ev.event.delta?.type === 'text_delta' && ev.event.delta.text) {
    return { delta: ev.event.delta.text };
  }
  if (ev.type === 'result') {
    if (ev.is_error) throw new ProviderError('upstream');
    if (typeof ev.result === 'string') return { result: ev.result };
  }
  return {};
}

function transcript(messages: ChatMessage[]): string {
  if (messages.length === 1) return messages[0].content;
  const history = messages.slice(0, -1).map(m => `${m.role === 'user' ? 'Người dùng' : 'Trợ lý'}: ${m.content}`).join('\n\n');
  return `Cuộc trò chuyện trước đó:\n\n${history}\n\nCâu hỏi mới của người dùng (hãy trả lời câu này):\n${messages[messages.length - 1].content}`;
}

// Chỉ truyền cho tiến trình con những biến cần để CLI chạy và xác thực.
const CLI_ENV_KEYS = ['PATH', 'Path', 'HOME', 'USERPROFILE', 'APPDATA', 'LOCALAPPDATA', 'SystemRoot', 'TEMP', 'TMP', 'LANG', 'ANTHROPIC_API_KEY', 'CLAUDE_CONFIG_DIR'];
let cliRunning = 0;

async function* cli(system: string, messages: ChatMessage[], signal: AbortSignal): AsyncGenerator<string> {
  const max = Math.max(1, Number(process.env.INTERPRET_CLI_CONCURRENCY) || 2);
  if (cliRunning >= max) throw new ProviderError('busy');
  cliRunning++;
  const dir = await mkdtemp(join(tmpdir(), 'ziwei-interpret-')).catch(() => { cliRunning--; throw new ProviderError('upstream'); });
  try {
    const systemFile = join(dir, 'system.txt');
    await writeFile(systemFile, system, 'utf8');
    const args = [
      '-p', '--output-format', 'stream-json', '--verbose', '--include-partial-messages',
      '--tools', '', '--disable-slash-commands', '--strict-mcp-config', '--no-session-persistence',
      '--setting-sources', '', '--system-prompt-file', systemFile,
    ];
    const model = process.env.INTERPRET_MODEL?.trim();
    if (model) args.push('--model', model);

    const env = {} as NodeJS.ProcessEnv;
    for (const k of CLI_ENV_KEYS) { const v = process.env[k]; if (v !== undefined) env[k] = v; }
    const child = spawn(/*turbopackIgnore: true*/ process.env.CLAUDE_CLI_PATH?.trim() || 'claude', args, { cwd: dir, env, shell: false, windowsHide: true, stdio: ['pipe', 'pipe', 'ignore'] });
    const kill = () => { child.kill(); };
    signal.addEventListener('abort', kill, { once: true });
    const exited = new Promise<number | null>(resolve => {
      child.once('error', () => resolve(-1));
      child.once('close', code => resolve(code));
    });
    child.stdin.on('error', () => {});
    child.stdin.end(transcript(messages), 'utf8');

    try {
      let streamed = false;
      const out = new ReadableStream<Uint8Array>({
        start(controller) {
          child.stdout.on('data', (chunk: Buffer) => controller.enqueue(new Uint8Array(chunk)));
          child.stdout.once('end', () => controller.close());
          child.stdout.once('error', () => controller.close());
        },
        cancel() { kill(); },
      });
      for await (const line of readLines(out)) {
        const t = cliTextOf(line);
        if (t.delta) { streamed = true; yield t.delta; }
        else if (t.result !== undefined && !streamed && t.result) { streamed = true; yield t.result; }
      }
      const code = await exited;
      if (signal.aborted) throw new ProviderError('upstream');
      if (code !== 0 || !streamed) throw new ProviderError('upstream');
    } finally {
      signal.removeEventListener('abort', kill);
      kill();
    }
  } finally {
    cliRunning--;
    await rm(dir, { recursive: true, force: true }).catch(() => {});
  }
}

/** Gọi nhà cung cấp và trả về stream SSE. Lỗi trước khi có chữ đầu tiên được ném ra để route trả mã lỗi HTTP. */
export async function startInterpretStream(
  provider: Provider,
  system: string,
  messages: ChatMessage[],
  clientSignal: AbortSignal,
): Promise<ReadableStream<Uint8Array>> {
  const signal = AbortSignal.any([clientSignal, AbortSignal.timeout(TIMEOUT_MS)]);
  const gen = provider === 'cli' ? cli(system, messages, signal) : anthropic(system, messages, signal);
  let first: IteratorResult<string>;
  try {
    first = await gen.next();
  } catch (e) {
    await gen.return(undefined).catch(() => {});
    throw e instanceof ProviderError ? e : new ProviderError('upstream');
  }
  return textToSseStream(first, gen, INTERRUPTED);
}
