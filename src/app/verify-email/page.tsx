"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) return;
    async function verifyAndLogin() {
      const res = await fetch(`/api/auth/verify-email?token=${token}`);

      console.log(res);
      if (res.ok) {
        await signIn("credentials", {
          token,
          redirect: true,
          callbackUrl: "/redirect-after-auth",
        });
      }
    }
    verifyAndLogin();
  }, [token]);

  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col bg-primary-50">
      <main className="flex-1 flex items-center justify-center">
        <p>Verifying your email…</p>
      </main>
    </div>
  );
}
