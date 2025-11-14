"use client";
import { ReactNode } from "react";

type OnboardingFooterProps = {
  children: ReactNode;
};

export default function OnboardingFooter({ children }: OnboardingFooterProps) {
  return (
    <footer className="bg-white border-t-2 border-primary-300 py-4 px-4 item-center">
      <div className="max-w-xl mx-auto flex justify-center font-karla gap-6">
        {children}
      </div>
    </footer>
  );
}
