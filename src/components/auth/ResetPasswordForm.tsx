// form sets new password with a new token, post request with newPassword, token

"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import axios, { AxiosError } from "axios";
import { EyeOn, EyeOff } from "@/icons/index";
import Link from "next/link";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmedNewPassword, setConfirmedNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmedNewPassword, setShowConfirmedNewPassword] =
    useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [signIn, setSignIn] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!token) {
      setError("Invalid or missing token.");
      return;
    }

    if (confirmedNewPassword !== newPassword) {
      setError("Passwords don't match.");
      return;
    }

    try {
      const res = await axios.post("/api/reset-password", {
        newPassword,
        token,
      });

      if (res.status === 200) {
        setMessage(res.data.message);
        setNewPassword("");
        setConfirmedNewPassword("");
        setSignIn(true);
      } else {
        setError(res.data.message);
      }
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      setError(error?.response?.data?.message || "Something went wrong.");
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

      {error && (
        <p className="rounded-md bg-red-100 p-2 text-center text-red-700">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[624px]">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-karla font-normal text-base text-gray-700">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-lg font-karla font-medium text-base border border-gray-300 px-4 py-3 bg-white focus:outline-none focus:ring-3 focus:ring-primary-100 focus:shadow-input"
              />
              <button
                type="button"
                onClick={handleShowNewPassword}
                className="absolute right-4 top-4 text-gray-500"
              >
                {showNewPassword ? <EyeOn /> : <EyeOff />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-karla font-normal text-base text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmedNewPassword ? "text" : "password"}
                required
                value={confirmedNewPassword}
                onChange={(e) => setConfirmedNewPassword(e.target.value)}
                className="w-full rounded-lg font-karla font-medium text-base border border-gray-300 px-4 py-3 bg-white focus:outline-none focus:ring-3 focus:ring-primary-100 focus:shadow-input"
              />
              <button
                type="button"
                onClick={handleShowConfirmedNewPassword}
                className="absolute right-4 top-4 text-gray-500"
              >
                {showConfirmedNewPassword ? <EyeOn /> : <EyeOff />}
              </button>
            </div>
          </div>
        </div>

        <div className="py-3">
          <button
            type="submit"
            className="w-full h-12 rounded-md bg-primary-500 py-2.5 px-3 font-karla font-bold text-white transition"
          >
            Save new password
          </button>
        </div>
      </form>

      {message && (
        <div className="p-6">
          <p className="p-2 font-karla font-semibold rounded-md bg-custom-success-50 text-custom-success-500">
            {message}
          </p>
        </div>
      )}
      {signIn && (
        <button className="w-[109px] rounded-md bg-accent-400 py-2.5 px-3 font-karla font-bold text-white transition">
          <Link href="/signin">Sign In</Link>
        </button>
      )}
    </main>
  );
}
