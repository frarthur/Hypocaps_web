type RateLimitEntry = { count: number; resetAt: number };

const store = new Map<string, RateLimitEntry>();

setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key);
  }
}, 60_000).unref?.();

export function rateLimit(
  identifier: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; retryAfter: number } {
  const now = Date.now();
  const entry = store.get(identifier);

  if (!entry || now > entry.resetAt) {
    store.set(identifier, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }

  if (entry.count < maxRequests) {
    entry.count++;
    return { allowed: true, retryAfter: 0 };
  }

  return { allowed: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
}
