"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import Link from "next/link";
import validator from "validator";
import { EyeOn, EyeOff } from "@/icons/index";
import SocialAuthButtons from "@/components/SocialAuthButtons";
import TextInput from "@/components/ui/TextInput";
import ResetSuccessMessage from "@/components/auth/ResetSuccessMessage";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [emailFocused, setEmailFocused] = useState(false); // Tracks if the field is currently focused (on focus)
  const [emailTouched, setEmailTouched] = useState(false); // Tracks if the user has interacted with the field (on blur)

  const [password, setPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false); // Tracks if the user has interacted with the field (on blur)
  const [passwordFocused, setPasswordFocused] = useState(false); // Tracks if the field is currently focused (on focus)

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showResetSuccess, setShowResetSuccess] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailTouched(true);
    setPasswordTouched(true);
    setError("");

    if (!email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!validator.isEmail(email)) {
      return;
    }

    if (!password) {
      // setError("Please enter your password.");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      router.push("/redirect-after-auth"); // use page here instead of route
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col min-h-screen py-20 px-4 items-center justify-start bg-primary-50">
      <Suspense fallback={null}>
        <ResetSuccessMessage setShowResetSuccess={setShowResetSuccess} />
      </Suspense>

      <h1 className="mb-12 text-2xl font-extrabold font-montserrat text-center tracking-[0.1em]">
        Sign in to your account
      </h1>
      <form
        noValidate
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-xl"
      >
        {showResetSuccess && (
          <p className="p-2 font-karla font-semibold rounded-md bg-custom-success-50 text-custom-success-500">
            Your password has been reset. Please sign in.
          </p>
        )}
        {error && (
          <p className="rounded-md bg-red-100 p-2 text-center text-red-500">
            {error}
          </p>
        )}

        {/* Email input field*/}
        <TextInput
          label="Email"
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setEmailFocused(true)}
          onBlur={() => {
            setEmailFocused(false);
            setEmailTouched(true);
          }}
          helperText="Enter your email."
          touched={emailTouched} // tells TextInput whether the field has been touched
          error={
            emailTouched && !email && !emailFocused
              ? "Required field." // shows error only when blurred and empty
              : emailTouched &&
                email &&
                !validator.isEmail(email) &&
                !emailFocused
              ? "Invalid email format."
              : undefined
          }
        />

        {/* Password input field*/}
        <TextInput
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => {
            setPasswordFocused(false);
            setPasswordTouched(true);
          }}
          touched={passwordTouched}
          error={
            passwordTouched && !password && !passwordFocused
              ? "Required field."
              : undefined
          }
          helperText="Enter your password."
          showIconButton
          icon={showPassword ? <EyeOn /> : <EyeOff />}
          onIconButtonClick={handleShowPassword}
        />

        <div className="cursor-pointer py-4 text-center font-karla text-base font-bold text-primary-500 hover:text-primary-700 active:text-primary-700">
          <Link href="/forgot-password">Forgot your password?</Link>
        </div>

        <button
          type="submit"
          className="cursor-pointer w-full h-12 rounded-md bg-primary-500 py-2.5 px-3 font-karla font-bold text-white transition hover:bg-primary-700 active:text-primary-700"
        >
          Sign In
        </button>

        <div className="text-center text-sm text-gray-600">OR</div>

        <div className="space-y-2">
          <SocialAuthButtons />
        </div>

        <p className="text-center text-sm text-gray-600">
          {"Don't have an account? "}
          <Link
            href="/signup"
            className="cursor-pointer font-bold text-primary-500 hover:text-primary-700"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
