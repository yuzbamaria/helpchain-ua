import { Suspense } from "react";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<p>Loading form...</p>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
