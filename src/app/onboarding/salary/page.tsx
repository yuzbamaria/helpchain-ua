"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SalaryPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const options = [
    "£20,000–£30,000",
    "£30,000–£40,000",
    "£40,000+",
    "I’m flexible",
  ];

  const handleSubmit = async () => {
    if (!selected) return;

    setLoading(true);
    try {
      const res = await fetch("/api/onboarding/salary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ salaryExpectation: selected }),
      });

      if (!res.ok) throw new Error("Failed to save");

      router.push("/onboarding/preferred-language");
    } catch (err) {
      console.error("Error saving salary:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F8FF] flex flex-col justify-between">
      <div className="max-w-xl w-full mx-auto p-6">
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="h-2 bg-blue-100 rounded-full">
            <div className="h-2 bg-blue-700 rounded-full w-[90%]" />
          </div>
          <p className="mt-2 text-sm text-gray-600">Step 9 of 10</p>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Your salary expectations
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          This helps employers know your expectations upfront. You can skip this
          if you’re flexible.
        </p>

        {/* Salary Options */}
        <div className="space-y-4">
          {options.map((option) => (
            <label
              key={option}
              className={`flex items-center gap-3 border rounded-md px-4 py-3 cursor-pointer ${
                selected === option ? "border-blue-600" : "border-[#D0D5DD]"
              } bg-white`}
            >
              <input
                type="radio"
                name="salary"
                value={option}
                checked={selected === option}
                onChange={() => setSelected(option)}
                className="accent-blue-600"
              />
              <span className="text-sm text-gray-800">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Footer Buttons */}
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
          disabled={!selected || loading}
          onClick={handleSubmit}
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
