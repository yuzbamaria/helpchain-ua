"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PreferredLanguagePage() {
  const router = useRouter();

  const [english, setEnglish] = useState(false);
  const [ukrainian, setUkrainian] = useState(false);
  const [otherLanguage, setOtherLanguage] = useState("");

  const handleSubmit = async () => {
    const selected = [];
    if (english) selected.push("English");
    if (ukrainian) selected.push("Ukrainian");
    if (otherLanguage.trim()) selected.push(otherLanguage.trim());

    try {
      await fetch("/api/onboarding/preferred-language", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preferredLanguage: selected }),
      });

      router.push("/onboarding/thank-you");
    } catch (err) {
      console.error("Failed to save:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F8FF] flex flex-col justify-between">
      <div className="max-w-xl w-full mx-auto p-6">
        {/* Step */}
        <div className="mb-4">
          <div className="h-2 bg-blue-100 rounded-full">
            <div className="h-2 bg-blue-700 rounded-full w-[100%]" />
          </div>
          <p className="mt-2 text-sm text-gray-600">Step 10 of 10</p>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Language skills
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Help us understand which languages you’re comfortable working in.
        </p>

        <div className="space-y-4">
          {/* Checkboxes styled like inputs */}
          <label className="flex items-center gap-3 p-3 border border-[#D0D5DD] rounded-md bg-white">
            <input
              type="checkbox"
              checked={english}
              onChange={(e) => setEnglish(e.target.checked)}
            />
            English
          </label>
          <label className="flex items-center gap-3 p-3 border border-[#D0D5DD] rounded-md bg-white">
            <input
              type="checkbox"
              checked={ukrainian}
              onChange={(e) => setUkrainian(e.target.checked)}
            />
            Ukrainian
          </label>

          {/* Other language input */}
          <input
            type="text"
            placeholder="Other language"
            value={otherLanguage}
            onChange={(e) => setOtherLanguage(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white"
          />
        </div>
      </div>

      {/* Footer buttons */}
      <div className="w-full bg-white border-t border-gray-200 p-4 flex justify-between">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
