const FALLBACK = "/discuss";

const DANGEROUS_SCHEMES = ["javascript:", "data:", "vbscript:"];

/**
 * Sanitize a callbackUrl to prevent open-redirect attacks.
 * Returns a safe relative path, or "/discuss" as fallback.
 */
export function sanitizeCallbackUrl(raw: unknown): string {
  if (typeof raw !== "string" || !raw) return FALLBACK;

  // Iterative decodeURIComponent to defeat multi-layer encoding (%252F%252F → //)
  let decoded = raw;
  try {
    let prev = "";
    while (prev !== decoded) {
      prev = decoded;
      decoded = decodeURIComponent(decoded);
    }
  } catch {
    return FALLBACK;
  }

  // Reject backslashes (browser normalization can turn /\ into //)
  if (decoded.includes("\\")) return FALLBACK;

  // Reject protocol-relative URLs
  if (decoded.startsWith("//")) return FALLBACK;

  // Must start with / (relative path)
  if (!decoded.startsWith("/")) return FALLBACK;

  // Reject dangerous URI schemes
  const lower = decoded.toLowerCase();
  for (const scheme of DANGEROUS_SCHEMES) {
    if (lower.includes(scheme)) return FALLBACK;
  }

  // Final validation: parse against localhost and confirm it stays local
  try {
    const url = new URL(decoded, "http://localhost");
    if (url.hostname !== "localhost") return FALLBACK;
    return url.pathname + url.search + url.hash;
  } catch {
    return FALLBACK;
  }
}
