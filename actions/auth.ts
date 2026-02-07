"use server";

import { signIn } from "@/lib/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

// In-memory rate limit: 1 magic link per email per minute
// Resets on deploy — acceptable for ~10 users
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_MS = 60_000;

function getAllowedEmails(): Set<string> {
  const raw = process.env.ALLOWED_EMAILS ?? "";
  return new Set(
    raw
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean)
  );
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

  // Rate limit check
  const lastSent = rateLimitMap.get(email) ?? 0;
  if (Date.now() - lastSent < RATE_LIMIT_MS) {
    return { error: "A magic link was just sent. Please check your email or wait a minute." };
  }

  rateLimitMap.set(email, Date.now());

  try {
    const result = await signIn("resend", { email, redirectTo: "/discuss", redirect: false });
    // signIn with redirect:false returns a URL string
    // If it contains "error", the email likely failed to send
    if (typeof result === "string" && result.includes("error")) {
      console.error("Auth signIn returned error URL:", result);
      return { error: "Failed to send magic link. Please try again." };
    }
    return { success: true };
  } catch (err) {
    if (isRedirectError(err)) throw err;
    console.error("Auth signIn threw:", err);
    return { error: "Something went wrong. Please try again." };
  }
}
