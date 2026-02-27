// Per-email: 1 request per 60 seconds
const EMAIL_WINDOW_MS = 60_000;
const EMAIL_MAX = 1;

// Per-IP: 5 requests per 5 minutes
const IP_WINDOW_MS = 5 * 60_000;
const IP_MAX = 5;

// Cleanup interval: every 10 minutes
const CLEANUP_INTERVAL_MS = 10 * 60_000;

const emailMap = new Map<string, number[]>();
const ipMap = new Map<string, number[]>();

function getRecentTimestamps(
  map: Map<string, number[]>,
  key: string,
  windowMs: number
): number[] {
  const now = Date.now();
  const timestamps = (map.get(key) ?? []).filter((t) => now - t < windowMs);
  map.set(key, timestamps);
  return timestamps;
}

export function checkRateLimit(
  email: string,
  ip: string
): { allowed: true } | { allowed: false; error: string } {
  const emailHits = getRecentTimestamps(emailMap, email, EMAIL_WINDOW_MS);
  if (emailHits.length >= EMAIL_MAX) {
    return {
      allowed: false,
      error: "A magic link was just sent. Please check your email or wait a minute.",
    };
  }

  const ipHits = getRecentTimestamps(ipMap, ip, IP_WINDOW_MS);
  if (ipHits.length >= IP_MAX) {
    return {
      allowed: false,
      error: "Too many sign-in attempts. Please wait a few minutes.",
    };
  }

  return { allowed: true };
}

export function recordRequest(email: string, ip: string): void {
  const now = Date.now();
  const emailTs = emailMap.get(email) ?? [];
  emailTs.push(now);
  emailMap.set(email, emailTs);

  const ipTs = ipMap.get(ip) ?? [];
  ipTs.push(now);
  ipMap.set(ip, ipTs);
}

export function rollbackRequest(email: string): void {
  emailMap.delete(email);
}

// Periodic cleanup to prevent unbounded Map growth
function cleanup() {
  const now = Date.now();
  for (const [key, timestamps] of emailMap) {
    const recent = timestamps.filter((t) => now - t < EMAIL_WINDOW_MS);
    if (recent.length === 0) emailMap.delete(key);
    else emailMap.set(key, recent);
  }
  for (const [key, timestamps] of ipMap) {
    const recent = timestamps.filter((t) => now - t < IP_WINDOW_MS);
    if (recent.length === 0) ipMap.delete(key);
    else ipMap.set(key, recent);
  }
}

setInterval(cleanup, CLEANUP_INTERVAL_MS).unref();
