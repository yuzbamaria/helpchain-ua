//asks user for email
"use client";

import { useState } from "react";
import axios from "axios";
import validator from "validator";
import TextInput from "@/components/ui/TextInput/TextInput";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (!validator.isEmail(email)) {
      setError("Invalid email format.");
      return;
    }

    try {
      const res = await axios.post("/api/forgot-password", { email });
      if (res.status === 200) {
        setMessage(
          res.data.message ||
            "Check your email for reset link. You can close this page now."
        ); // message from API route
        setEmail(""); // clear input
      } else {
        setError(res.data.message || "Something went wrong.");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        // axios error has response and data
        setError(
          err.response?.data?.message || "Failed to send request. Try again."
        );
      } else if (err instanceof Error) {
        // generic JS error
        setError(err.message);
      } else {
        setError("Failed to send request. Try again.");
      }
    }
  };

  return (
    <main className="flex flex-col min-h-screen py-20 px-4 items-center justify-start bg-primary-50">
      <div className="flex flex-col gap-4 pb-12">
        <h1 className="text-2xl font-extrabold font-montserrat text-center tracking-[0.1em]">
          Forgot Password
        </h1>
        <p className="font-karla font-normal text-center text-base text-gray-700 ">
          Enter your email to receive a password reset link.
        </p>
      </div>

      <form
        noValidate
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-full max-w-xl"
      >
        {error && (
          <p className="rounded-md bg-red-100 p-2 text-center text-red-700">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-1.5">
          {/* Email input field*/}
          <TextInput
            label="Email"
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            helperText="Enter your email."
          />
        </div>

        <button
          type="submit"
          className="cursor-pointer w-full h-12 rounded-md bg-primary-500 py-2.5 px-3 font-karla font-bold text-white transition hover:bg-primary-700  active:text-primary-700"
        >
          Send Reset Link
        </button>
      </form>

      {message && (
        <div className="p-6">
          <p className="p-2 font-karla font-semibold rounded-md bg-custom-success-50 text-custom-success-500">
            {message}
          </p>
        </div>
      )}
    </main>
  );
}
