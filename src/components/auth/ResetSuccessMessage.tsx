"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ResetSuccessMessage({ setShowResetSuccess }: { setShowResetSuccess: (val: boolean) => void }) {
  const searchParams = useSearchParams();
  const resetSuccess = searchParams.get("reset") === "success";

  useEffect(() => {
    if (resetSuccess) {
      setShowResetSuccess(true);
      const timer = setTimeout(() => {
        setShowResetSuccess(false);
        const url = new URL(window.location.href);
        url.searchParams.delete("reset");
        window.history.replaceState({}, "", url.toString());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [resetSuccess, setShowResetSuccess]);

  return null;
}
