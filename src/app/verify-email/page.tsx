"use client";

import { Suspense } from "react";
import VerifyEmailInner from "./page";

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Verifying your email…</div>}>
      <VerifyEmailInner />
    </Suspense>
  );
}
