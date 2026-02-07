"use client";

import { useActionState } from "react";
import { loginAction } from "@/actions/auth";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(
    async (_prev: { error?: string; success?: boolean } | null, formData: FormData) => {
      return loginAction(formData);
    },
    null
  );

  if (state?.success) {
    return (
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8 text-emerald-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
        </div>
        <h2 className="text-xl font-serif font-bold text-slate-heading">Check your email</h2>
        <p className="mt-2 text-slate-body">
          We sent a magic link to your inbox. Click it to sign in.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-body mb-1.5">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-white text-slate-heading placeholder:text-slate-muted focus:outline-none focus:ring-2 focus:ring-amber/50 focus:border-amber transition-colors"
        />
      </div>

      {state?.error && (
        <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full px-6 py-3 bg-amber text-white font-semibold rounded-xl hover:bg-amber-dark transition-colors shadow-lg shadow-amber/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pending ? "Sending..." : "Send Magic Link"}
      </button>
    </form>
  );
}
