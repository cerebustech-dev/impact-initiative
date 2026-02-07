import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Sign In | The Impact Initiative",
  robots: { index: false },
};

export const dynamic = "force-dynamic";

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const callbackUrl = params.callbackUrl ?? "/discuss";
  const token = params.token ?? "";
  const email = params.email ?? "";

  // Build the actual Auth.js callback URL
  const authCallback = `/api/auth/callback/resend?${new URLSearchParams({
    callbackUrl,
    token,
    email,
  })}`;

  return (
    <main className="min-h-screen flex items-center justify-center bg-cream px-4">
      <div className="bg-white rounded-xl p-8 shadow-sm shadow-card-shadow max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber/10 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8 text-amber"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
            />
          </svg>
        </div>
        <h1 className="text-xl font-serif font-bold text-slate-heading mb-2">
          Complete Sign In
        </h1>
        <p className="text-slate-body mb-6">
          Click the button below to finish signing in to The Impact Initiative.
        </p>
        <a
          href={authCallback}
          className="inline-block w-full px-6 py-3 bg-amber text-white font-semibold rounded-xl hover:bg-amber-dark transition-colors shadow-lg shadow-amber/20"
        >
          Sign In to Forum
        </a>
        <p className="text-xs text-slate-muted mt-4">
          This page confirms you are a real person, not an automated email scanner.
        </p>
      </div>
    </main>
  );
}
