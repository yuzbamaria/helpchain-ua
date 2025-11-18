"use client";

import { useRouter } from "next/navigation";
import Email from "@/icons/Email";
import { ChevronUp, ArrowRight, ArrowLeft, CheckMark } from "@/icons/index";
import ProgressBar from "@/components/ProgressBar";
import OnboardingFooter from "@/components/OnboardingFooter";
import MainButton from "@/components/ui/MainButton/MainButton";
import LinkButton from "@/components/ui/LinkButton/LinkButton";
import CheckMark2 from "@/icons/CheckMark2";
import CheckMark3 from "@/icons/CheckMark3";

export default function VerifyEmail() {
  const router = useRouter();

  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col bg-primary-50">
      <ProgressBar percent={20} stepInfo="Step 2 of 10" />
      <main className="flex-1 flex flex-col gap-4 items-center justify-center px-6">
        <div className="flex flex-col gap-12 pb-12">
          <h1 className="text-2xl font-extrabold font-montserrat text-center tracking-[0.1em]">
            Verify your email
          </h1>
          <p className="font-karla font-normal text-center text-base text-gray-700">
            We’ve sent a confirmation link to your email. Please check your
            inbox.
          </p>
        </div>
        <div>
          <Email />
        </div>
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
          state="normal"
          size="lg"
          type="button"
          aria-label="main button"
        >
          Link sent
          <CheckMark3 className="w-4 h-4" />
        </MainButton>
      </OnboardingFooter>
    </div>
  );
}
