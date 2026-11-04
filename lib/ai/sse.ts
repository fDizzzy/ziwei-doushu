// Định dạng SSE giữa /api/interpret và UI: `data: {"delta":{"text":"..."}}` và kết thúc bằng `data: [DONE]`.

/** Đọc stream SSE, giữ lại dòng bị cắt giữa hai lần đọc, gọi onText cho từng đoạn chữ. */
export async function readSseText(body: ReadableStream<Uint8Array>, onText: (delta: string) => void): Promise<void> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let pending = '';
  let finished = false;

  const handle = (rawLine: string): void => {
    const line = rawLine.endsWith('\r') ? rawLine.slice(0, -1) : rawLine;
    if (!line.startsWith('data: ')) return;
    const data = line.slice(6);
    if (data === '[DONE]') { finished = true; return; }
    try {
      const text = JSON.parse(data).delta?.text;
      if (typeof text === 'string' && text) onText(text);
    } catch { /* dòng JSON hỏng thì bỏ qua */ }
  };

  while (!finished) {
    const { done, value } = await reader.read();
    if (done) break;
    pending += decoder.decode(value, { stream: true });
    const lines = pending.split('\n');
    pending = lines.pop() ?? '';
    for (const line of lines) {
      handle(line);
      if (finished) break;
    }
  }
  if (!finished && pending) handle(pending);
  await reader.cancel().catch(() => {});
}

/** Gói một generator chữ thành stream SSE theo định dạng trên. Lỗi giữa chừng được báo bằng một dòng chữ chung chung. */
export function textToSseStream(
  first: IteratorResult<string>,
  rest: AsyncGenerator<string>,
  interruptedNotice: string,
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  const frame = (text: string) => encoder.encode(`data: ${JSON.stringify({ delta: { text } })}\n\n`);
  let primed: IteratorResult<string> | null = first;
  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      try {
        const step: IteratorResult<string> = primed ?? (await rest.next());
        primed = null;
        if (step.done) {
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
          return;
        }
        controller.enqueue(frame(step.value));
      } catch {
        controller.enqueue(frame(interruptedNotice));
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      }
    },
    async cancel() {
      await rest.return(undefined).catch(() => {});
    },
  });
}

/** Tách các dòng của một stream byte, giữ phần dở dang giữa hai lần đọc. */
export async function* readLines(body: ReadableStream<Uint8Array>): AsyncGenerator<string> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let pending = '';
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      pending += decoder.decode(value, { stream: true });
      const lines = pending.split('\n');
      pending = lines.pop() ?? '';
      for (const line of lines) yield line.endsWith('\r') ? line.slice(0, -1) : line;
    }
    pending += decoder.decode();
    if (pending) yield pending;
  } finally {
    await reader.cancel().catch(() => {});
  }
}
