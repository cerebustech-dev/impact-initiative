"use server";

import { signIn } from "@/lib/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { headers } from "next/headers";
import { checkRateLimit, recordRequest, rollbackRequest } from "@/lib/rate-limit";
import { sanitizeCallbackUrl } from "@/lib/url";

function getAllowedEmails(): Set<string> {
  const raw = process.env.ALLOWED_EMAILS ?? "";
  return new Set(
    raw
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean)
  );
}

async function getClientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return h.get("x-real-ip") ?? "unknown";
}

export async function loginAction(formData: FormData) {
  const rawEmail = formData.get("email");
  if (typeof rawEmail !== "string" || !rawEmail) {
    return { error: "Please enter your email address." };
  }

  const email = rawEmail.trim().toLowerCase();

  // Whitelist check — before sending any email
  const allowed = getAllowedEmails();
  if (!allowed.has(email)) {
    return { error: "This email is not authorized. Contact your program administrator." };
  }

  // Rate limit check (per-email + per-IP)
  const ip = await getClientIp();
  const limit = checkRateLimit(email, ip);
  if (!limit.allowed) {
    return { error: limit.error };
  }

  recordRequest(email, ip);

  // Sanitize callbackUrl from form data
  const rawCallback = formData.get("callbackUrl");
  const redirectTo = sanitizeCallbackUrl(rawCallback);

  try {
    await signIn("resend", { email, redirectTo, redirect: false });
    return { success: true };
  } catch (err) {
    if (isRedirectError(err)) throw err;
    rollbackRequest(email);
    return { error: "Something went wrong. Please try again." };
  }
}
