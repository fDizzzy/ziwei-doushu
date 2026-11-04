import { createRateLimiter } from '@/lib/ai/rate-limit';
import { buildSystemPrompt } from '@/lib/ai/prompt';
import { ProviderError, resolveProvider, startInterpretStream } from '@/lib/ai/providers';
import { InvalidRequestError, LIMITS, parseInterpretRequest } from '@/lib/ai/request';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const limiter = createRateLimiter(Math.max(1, Number(process.env.INTERPRET_RATE_LIMIT) || 20), 60_000);

function fail(status: number, message: string): Response {
  return Response.json({ error: message }, { status, headers: { 'Cache-Control': 'no-store' } });
}

// Chỉ tin X-Forwarded-For khi có reverse proxy tin cậy (INTERPRET_TRUST_PROXY=1); nếu không, mọi người dùng chung một xô giới hạn.
function clientKey(req: Request): string {
  if (process.env.INTERPRET_TRUST_PROXY === '1') {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
    if (ip) return ip;
  }
  return 'shared';
}

function sameOrigin(req: Request): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return true;
  try {
    return new URL(origin).host === req.headers.get('host');
  } catch {
    return false;
  }
}

async function readCappedText(req: Request, maxBytes: number): Promise<string | null> {
  const declared = Number(req.headers.get('content-length'));
  if (Number.isFinite(declared) && declared > maxBytes) return null;
  if (!req.body) return '';
  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > maxBytes) {
      await reader.cancel().catch(() => {});
      return null;
    }
    chunks.push(value);
  }
  return new TextDecoder().decode(Buffer.concat(chunks));
}

export async function POST(req: Request): Promise<Response> {
  const provider = resolveProvider();
  if (!provider) return fail(503, 'Dịch vụ luận giải AI chưa được cấu hình.');
  if (!sameOrigin(req)) return fail(403, 'Yêu cầu không hợp lệ.');
  if (!limiter.take(clientKey(req))) return fail(429, 'Bạn thao tác quá nhanh, vui lòng thử lại sau ít phút.');

  const raw = await readCappedText(req, LIMITS.bodyBytes);
  if (raw === null) return fail(413, 'Dữ liệu gửi lên quá lớn.');

  let parsed;
  try {
    parsed = parseInterpretRequest(JSON.parse(raw));
  } catch (e) {
    if (e instanceof InvalidRequestError || e instanceof SyntaxError) return fail(400, 'Dữ liệu yêu cầu không hợp lệ.');
    throw e;
  }

  try {
    const stream = await startInterpretStream(provider, buildSystemPrompt(parsed.chart), parsed.messages, req.signal);
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'X-Accel-Buffering': 'no',
      },
    });
  } catch (e) {
    if (e instanceof ProviderError && e.kind === 'busy') return fail(429, 'Hệ thống đang bận, vui lòng thử lại sau.');
    console.error('[interpret] provider failed:', e instanceof Error ? e.name : 'unknown');
    return fail(502, 'Luận giải thất bại, vui lòng thử lại sau.');
  }
}
