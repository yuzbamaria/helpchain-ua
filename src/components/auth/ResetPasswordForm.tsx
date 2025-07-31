// form sets new password with a new token, post request with newPassword, token

"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { EyeOn, EyeOff } from "@/icons/index";
import TextInput from "@/components/ui/TextInput";
import { validatePassword } from "@/utils/validatePassword";
import { resetPasswordRequest } from "@/utils/resetPassword";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [newPasswordTouched, setNewPasswordTouched] = useState(false); // Tracks if the user has interacted with the field (on blur)
  const [newPasswordFocused, setNewPasswordFocused] = useState(false);

  const [confirmedNewPassword, setConfirmedNewPassword] = useState("");
  const [showConfirmedNewPassword, setShowConfirmedNewPassword] = useState(false);
  const [confirmedNewPasswordTouched, setConfirmedNewPasswordTouched] = useState(false);
  const [confirmedNewPasswordFocused, setConfirmedNewPasswordFocused] = useState(false);

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordError = validatePassword(newPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setNewPasswordTouched(true);
    setConfirmedNewPasswordTouched(true);

    if (!newPassword || !confirmedNewPassword) {
      setError("Please fill in all required fields.");
      return;
    }

    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (!token) {
      setError("Invalid or missing token.");
      return;
    }

    if (confirmedNewPassword !== newPassword) {
      setError("Passwords don't match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await resetPasswordRequest({ newPassword, token });

      if (res.status === 200) {
        router.push("/signin?reset=success");
      } else {
        setError(res.data.message || "Reset failed. Try again.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShowNewPassword = () => {
    setShowNewPassword((prev) => !prev);
  };

  const handleShowConfirmedNewPassword = () => {
    setShowConfirmedNewPassword((prev) => !prev);
  };

  return (
    <main className="flex flex-col gap-4 min-h-screen py-20 px-4 items-center justify-start bg-primary-50">
      <h1 className="text-2xl font-extrabold font-montserrat text-center tracking-[0.1em]">
        Reset Password
      </h1>
      <p className="font-karla font-normal text-center text-base text-gray-700 ">
        Enter your new password.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full gap-4 max-w-xl"
      >
        {error && (
          <p className="w-full rounded-md bg-red-100 p-2 text-center text-red-500">
            {error}
          </p>
        )}
        <div className="flex flex-col gap-4">
          {/* New Password input field  */}
          <TextInput
            label="New Password"
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            required
            onChange={(e) => setNewPassword(e.target.value)}
            onFocus={() => setNewPasswordFocused(true)}
            onBlur={() => {
              setNewPasswordFocused(false);
              setNewPasswordTouched(true);
            }}
            touched={newPasswordTouched}
            error={
              newPasswordTouched && !newPassword && !newPasswordFocused
                ? "Required field."
                : newPasswordTouched && passwordError && !newPasswordFocused
                ? passwordError
                : undefined
            }
            helperText="Enter a secure password: at least 8 characters, including upper-case and lower-case letters, numbers and special characters."
            showIconButton
            icon={showNewPassword ? <EyeOn /> : <EyeOff />}
            onIconButtonClick={handleShowNewPassword}
          />

          {/* Confirm Password input field  */}
          <TextInput
            label="Confirm Password"
            type={showConfirmedNewPassword ? "text" : "password"}
            value={confirmedNewPassword}
            required
            onChange={(e) => setConfirmedNewPassword(e.target.value)}
            onFocus={() => setConfirmedNewPasswordFocused(true)}
            onBlur={() => {
              setConfirmedNewPasswordFocused(false);
              setConfirmedNewPasswordTouched(true);
            }}
            touched={confirmedNewPasswordTouched}
            error={
              confirmedNewPasswordTouched &&
              !confirmedNewPassword &&
              !confirmedNewPasswordFocused
                ? "Required field."
                : confirmedNewPasswordTouched &&
                  confirmedNewPassword &&
                  !confirmedNewPasswordFocused &&
                  newPassword !== confirmedNewPassword
                ? "Passwords do not match."
                : undefined
            }
            helperText="Make sure it matches your password above."
            showIconButton
            icon={showConfirmedNewPassword ? <EyeOn /> : <EyeOff />}
            onIconButtonClick={handleShowConfirmedNewPassword}
          />
        </div>

        <div className="py-3">
          <button
            type="submit"
            className="w-full h-12 rounded-md bg-primary-500 py-2.5 px-3 font-karla font-bold text-white transition cursor-pointer hover:bg-primary-700 active:text-primary-700"
          >
            {isSubmitting ? "Saving..." : "Save new password"}
          </button>
        </div>
      </form>
    </main>
  );
}
