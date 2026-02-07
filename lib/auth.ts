import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db";
import {
  users,
  accounts,
  sessions,
  verificationTokens,
} from "@/db/schema";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: "The Impact Initiative <noreply@rodsaiclass.com>",
      async sendVerificationRequest({ identifier: to, provider, url }) {
        // Redirect through an intermediate page to defeat corporate email
        // link scanners (Safe Links, etc.) that prefetch URLs and consume
        // one-time tokens before the user can click.
        const parsed = new URL(url);
        const verifyUrl = new URL("/auth/verify", parsed.origin);
        verifyUrl.searchParams.set("callbackUrl", parsed.searchParams.get("callbackUrl") ?? "/discuss");
        verifyUrl.searchParams.set("token", parsed.searchParams.get("token") ?? "");
        verifyUrl.searchParams.set("email", parsed.searchParams.get("email") ?? "");
        const safeUrl = verifyUrl.toString();

        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${provider.apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: provider.from,
            to,
            subject: "Your Impact Initiative access link",
            html: `<body style="background:#f6f6f6;padding:40px 0"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;margin:0 auto;background:#fff;border-radius:12px;padding:40px"><tr><td style="text-align:center"><h1 style="color:#1a1a1a;font-size:24px">The Impact Initiative</h1><p style="color:#666;font-size:16px">Click the button below to access the discussion forum.</p><a href="${safeUrl}" style="display:inline-block;background:#c56d28;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:16px;margin:16px 0">Access Forum</a><p style="color:#999;font-size:13px;margin-top:24px">If you didn't request this, you can safely ignore this email.</p></td></tr></table></body>`,
            text: `The Impact Initiative\n\nAccess the discussion forum:\n${safeUrl}\n`,
          }),
        });
        if (!res.ok) {
          throw new Error("Resend error: " + (await res.text()));
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    verifyRequest: "/login?verify=1",
  },
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
});
