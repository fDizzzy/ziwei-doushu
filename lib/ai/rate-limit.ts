// Giới hạn tần suất theo cửa sổ trượt, lưu trong bộ nhớ của một tiến trình.
// Chạy nhiều instance thì mỗi instance đếm riêng; cần giới hạn toàn cục thì thay bằng kho dùng chung (Redis...).
export function createRateLimiter(limit: number, windowMs: number, now: () => number = Date.now) {
  const hits = new Map<string, number[]>();
  return {
    /** true = cho qua, false = vượt giới hạn. */
    take(key: string): boolean {
      const t = now();
      const recent = (hits.get(key) ?? []).filter(x => t - x < windowMs);
      if (recent.length >= limit) {
        hits.set(key, recent);
        return false;
      }
      recent.push(t);
      hits.set(key, recent);
      if (hits.size > 5000) {
        for (const [k, v] of hits) if (v.every(x => t - x >= windowMs)) hits.delete(k);
      }
      return true;
    },
  };
}
