import { Suspense } from "react";
import type { Metadata } from "next";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Sign In | The Impact Initiative",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="py-24 md:py-32">
      <div className="max-w-sm mx-auto px-6">
        <div className="bg-white rounded-xl p-8 shadow-sm shadow-card-shadow">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Sign In</h1>
            <p className="mt-2 text-sm text-slate-muted">
              Enter your email to receive a magic link
            </p>
          </div>
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
