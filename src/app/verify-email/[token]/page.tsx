"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function VerifyEmailPage({ params }: { params: { token: string } }) {
  const router = useRouter();
  const { token } = params;
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    async function verify() {
      const res = await fetch(`/api/verify-email/${token}`);
      const data = await res.json();

      console.log(data)

      if (res.ok) {
        setStatus("Email verified! Logging you in...");
        await signIn("credentials", { token, redirect: true, callbackUrl: "/redirect-after-auth" });
      } else {
        setStatus("Invalid or expired token.");
      }
    }

    verify();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1>{status}</h1>
    </div>
  );
}