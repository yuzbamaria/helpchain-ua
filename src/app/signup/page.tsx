"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { EyeOn, EyeOff, CheckMark } from "@/icons/index";
import SocialAuthButtons from "@/components/SocialAuthButtons";
import { validatePassword } from "@/utils/validatePassword";
import TextInput from "@/components/ui/TextInput";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const [error, setError] = useState("");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false); // Tracks if the user has interacted with the field (on blur)
  const [passwordFocused, setPasswordFocused] = useState(false); // Tracks if the field is currently focused (on focus)

  const [passwordConfirmed, setPasswordConfirmed] = useState("");
  const [showPasswordConfirmed, setShowPasswordConfirmed] = useState(false);
  const [passwordConfirmedTouched, setPasswordConfirmedTouched] =
    useState(false);
  const [passwordConfirmedFocused, setPasswordConfirmedFocused] =
    useState(false);

  const passwordError = validatePassword(password);
  useEffect(() => {
    // Clear error when password becomes valid and matches
    if (!passwordError && password && password === passwordConfirmed) {
      setError("");
    }
  }, [password, passwordConfirmed, passwordError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !passwordConfirmed) {
      setError("Please fill in all required fields.");
      return;
    }

    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (passwordConfirmed !== password) {
      setError("Passwords don't match.");
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.status === 201) {
      router.push("/signin");
    } else {
      const data = await res.json();
      setError(data.message || "Something went wrong");
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleShowPasswordConfirmed = () => {
    setShowPasswordConfirmed((prev) => !prev);
  };

  return (
    <div className="flex flex-col py-20 px-4 items-center justify-center bg-primary-50">
      <div className="flex flex-col gap-4 pb-12">
        <h1 className="text-2xl font-extrabold font-montserrat text-center tracking-[0.1em]">
          Create Your Account
        </h1>
        <p className="font-karla font-normal text-center text-base text-gray-700">
          Use your email or sign up with Google or Facebook.
        </p>
      </div>

      <form
        noValidate
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-xl"
      >
        {error && (
          <p className="rounded-md bg-red-100 p-2 text-center text-error-500">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-4">
          {/* Email input */}
          <div className="flex flex-col gap-1.5">
            <label className="font-karla font-normal text-base text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => {
                setEmailFocused(false);
                setEmailTouched(true);
              }}
              className={`w-full rounded-lg border px-4 py-3 bg-white focus:outline-none focus:ring-3
                ${
                  emailTouched && !email
                    ? "border-error-500 focus:ring-error-100 focus:shadow-error-sm"
                    : "border-gray-300 focus:ring-primary-100 focus:shadow-input focus:border-primary-300"
                }
              `}
            />
            {emailTouched && !email && !emailFocused && (
              <p className="mt-1 font-karla text-sm text-error-500">
                Required field.
              </p>
            )}
          </div>

          {/* Password input  */}

          <TextInput
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
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
                : passwordTouched && passwordError && !passwordFocused
                ? passwordError
                : undefined
            }
            helperText="Enter a secure password: at least 8 characters, including upper-case and lower-case letters, numbers and special characters."
            showIconButton
            icon={showPassword ? <EyeOn /> : <EyeOff />}
            onIconButtonClick={handleShowPassword}
          />

          {/* Password confirmation input  */}
          <div className="flex flex-col gap-1.5">
            <label className="font-karla font-normal text-base text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPasswordConfirmed ? "text" : "password"}
                required
                value={passwordConfirmed}
                onChange={(e) => setPasswordConfirmed(e.target.value)}
                onFocus={() => setPasswordConfirmedFocused(true)}
                onBlur={() => {
                  setPasswordConfirmedFocused(false);
                  setPasswordConfirmedTouched(true);
                }}
                className={`w-full rounded-lg border px-4 py-3 bg-white focus:outline-none focus:ring-3
              ${
                passwordConfirmedTouched &&
                (!passwordConfirmed || password !== passwordConfirmed)
                  ? "border-error-500 focus:ring-error-100 focus:shadow-error-sm"
                  : "border-gray-300 focus:ring-primary-100 focus:shadow-input focus:border-primary-300"
              }
            `}
              />
              {passwordConfirmedFocused && (
                <p className="mt-1 font-karla text-sm text-gray-500">
                  Make sure it matches your password above.
                </p>
              )}
              {passwordConfirmedTouched &&
                !passwordConfirmed &&
                !passwordConfirmedFocused && (
                  <p className="mt-1 font-karla text-sm text-error-500">
                    Required field.
                  </p>
                )}
              {passwordConfirmedTouched &&
                passwordConfirmed &&
                !passwordConfirmedFocused &&
                password !== passwordConfirmed && (
                  <p className="mt-1 font-karla text-sm text-error-500">
                    Passwords do not match.
                  </p>
                )}
              <button
                type="button"
                onClick={handleShowPasswordConfirmed}
                className="absolute right-4 top-4 text-gray-500"
              >
                {showPasswordConfirmed ? <EyeOn /> : <EyeOff />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-3">
            <label className="relative">
              <input
                type="checkbox"
                className="peer cursor-pointer w-5 h-5 bg-white rounded-md border border-gray-300 appearance-none focus:ring-2 focus:ring-primary-300 checked:bg-primary-500"
              />
              <span className="pointer-events-none absolute top-1 left-1 hidden peer-checked:block">
                <CheckMark />
              </span>
            </label>

            <label className="font-karla text-sm font-normal text-gray-500">
              {`I'd like to receive emails relating to job search and updates
              about new features.`}
            </label>
          </div>

          <div className="flex justify-center font-karla text-sm font-normal text-gray-500">
            By signing up you agree to our Privacy Policy and Terms & Conditions
            for Candidates.
          </div>
          <div className="flex justify-center font-karla text-base font-normal gray-900">
            OR
          </div>
        </div>

        <button
          type="submit"
          className="w-full h-12 rounded-md bg-primary-500 py-2.5 px-3 font-karla font-bold text-white transition hover:bg-primary-700"
        >
          Create Account
        </button>

        <SocialAuthButtons />

        <p className="pt-8 text-center font-karla text-base text-gray-700">
          {"Already have an account?"}{" "}
          <Link
            href="/signin"
            className="font-bold text-primary-500 hover:text-primary-800"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
