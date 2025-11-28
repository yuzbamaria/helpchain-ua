"use client";

import { Suspense } from "react";
import EmailVerificationInner from "./EmailVerificationInner";

export default function EmailVerificationPage() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <EmailVerificationInner />
    </Suspense>
  );
}
