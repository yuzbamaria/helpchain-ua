"use client";

import { signIn } from "next-auth/react";
import { googleIcon } from "@/icons/GoogleIcon";
import { facebookIcon } from "@/icons/FacebookIcon";

export default function SocialAuthButtons() {
    return (
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/redirect-after-auth" })}
            className="w-full rounded-lg border border-gray-300 bg-white py-2.5 px-3 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-200 focus:bg-white focus:shadow-social-button"
          >
            <div className="flex justify-center gap-3">
              <div>{googleIcon}</div>
              <div className="font-karla font-bold">Sign in with Google</div>
            </div>
          </button>
          <button
            type="button"
            // onClick={() => signIn("facebook")}
            className="w-full rounded-lg border border-gray-300 bg-white py-2.5 px-3 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-3 focus:ring-gray-200 focus:bg-white focus:shadow-social-button"
          >
            <div className="flex justify-center gap-3">
              <div>{facebookIcon}</div>
              <div className="font-karla font-bold">Sign in with Facebook</div>
            </div>
          </button>
        </div>
    )
}