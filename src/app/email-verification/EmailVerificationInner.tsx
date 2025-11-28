"use client";

import Email from "@/icons/Email";
import { ArrowRight, ArrowLeft } from "@/icons/index";
import ProgressBar from "@/components/ProgressBar";
import OnboardingFooter from "@/components/OnboardingFooter";
import MainButton from "@/components/ui/MainButton/MainButton";
import LinkButton from "@/components/ui/LinkButton/LinkButton";
import CheckMark3 from "@/icons/CheckMark3";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function EmailVerificationInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const [waitTime, setWaitTime] = useState(30);
  const [email, setEmail] = useState<string | null>(null);
  const [resendClicked, setResendClicked] = useState(false);

  useEffect(() => {
    if (!userId) return;

    async function fetchEmail() {
      const res = await fetch(`/api/auth/get-user-email?userId=${userId}`);
      if (res.ok) {
        const data = await res.json();
        setEmail(data.email);
      }
    }

    fetchEmail();
  }, [userId]);

  useEffect(() => {
    if (waitTime === 0) return;
    const timer = setInterval(() => {
      setWaitTime((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [waitTime]);

  async function handleEmailResend() {
    if (!email) return;
    try {
      const res = await fetch("/api/auth/resend-verification-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setResendClicked(true);
        setWaitTime(30);
      }
    } catch (err) {
      console.error(err);
    }
  }

  const isDisabled = waitTime > 0;

  const buttonLabel = isDisabled ? (
    <>
      Link sent <CheckMark3 className="w-4 h-4" />
    </>
  ) : (
    <>
      Resend link <ArrowRight className="w-4 h-4" />
    </>
  );

  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col bg-primary-50">
      <ProgressBar percent={20} stepInfo="Step 2 of 10" />

      <main className="flex-1 flex flex-col gap-4 items-center justify-center px-6">
        <div className="flex flex-col gap-12 pb-12">
          <h1 className="text-2xl font-extrabold font-montserrat text-center tracking-[0.1em]">
            Verify your email
          </h1>

          {resendClicked ? (
            <p className="font-karla font-normal text-center text-base text-gray-700">
              Didn’t get the email? Check your spam folder or try resending
              below.
            </p>
          ) : (
            <p className="font-karla font-normal text-center text-base text-gray-700">
              We’ve sent a confirmation link to your email. Please check your
              inbox.
            </p>
          )}
        </div>

        <Email className="max-w-[375px]"/>
      </main>

      <OnboardingFooter>
        <LinkButton
          size="md"
          variant="left"
          type="button"
          state="normal"
          iconLeft={<ArrowLeft className="w-6 h-6" />}
          onClick={() => router.back()}
        >
          Back
        </LinkButton>

        <MainButton
          variant="primary"
          state={isDisabled ? "disabled" : "normal"}
          disabled={isDisabled}
          onClick={!isDisabled ? handleEmailResend : undefined}
          size="lg"
          type="button"
          aria-label="main button"
        >
          {buttonLabel}
        </MainButton>
      </OnboardingFooter>
    </div>
  );
}
