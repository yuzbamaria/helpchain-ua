"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";

const levels = ["Basic", "Intermediate", "Fluent", "Native"];

export default function LanguagePage() {
  const router = useRouter();
  // const { data: session } = useSession();

  const [englishSelected, setEnglishSelected] = useState(false);
  const [ukrainianSelected, setUkrainianSelected] = useState(false);
  const [englishLevel, setEnglishLevel] = useState("");
  const [ukrainianLevel, setUkrainianLevel] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/onboarding/language");
      const data = await res.json();
      if (data?.languageSkills) {
        const { english, ukrainian } = data.languageSkills;
        if (english) {
          setEnglishSelected(true);
          setEnglishLevel(english);
        }
        if (ukrainian) {
          setUkrainianSelected(true);
          setUkrainianLevel(ukrainian);
        }
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      english: englishSelected ? englishLevel : null,
      ukrainian: ukrainianSelected ? ukrainianLevel : null,
    };

    const res = await fetch("/api/onboarding/language", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push("/onboarding/salary");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <div className="max-w-xl mx-auto w-full p-6">
        <div className="mb-4">
          <div className="h-2 bg-blue-100 rounded-full">
            <div className="h-2 bg-blue-600 rounded-full w-[80%]" />
          </div>
          <p className="mt-2 text-sm text-gray-600">Step 8 of 10</p>
        </div>

        <h1 className="text-xl font-bold text-gray-900 mb-2">
          Languages you can work in
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          We’ll use this to match you with jobs requiring language skills.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* English */}
          <div>
            <label className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={englishSelected}
                onChange={() => setEnglishSelected((prev) => !prev)}
              />
              <span className="text-sm font-medium text-gray-800">English</span>
            </label>
            {englishSelected && (
              <select
                value={englishLevel}
                onChange={(e) => setEnglishLevel(e.target.value)}
                className="w-full border px-3 py-2 rounded-md"
                required
              >
                <option value="">Select proficiency</option>
                {levels.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Ukrainian */}
          <div>
            <label className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={ukrainianSelected}
                onChange={() => setUkrainianSelected((prev) => !prev)}
              />
              <span className="text-sm font-medium text-gray-800">
                Ukrainian
              </span>
            </label>
            {ukrainianSelected && (
              <select
                value={ukrainianLevel}
                onChange={(e) => setUkrainianLevel(e.target.value)}
                className="w-full border px-3 py-2 rounded-md"
                required
              >
                <option value="">Select proficiency</option>
                {levels.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="h-10" />
        </form>
      </div>

      {/* Footer with buttons */}
      <div className="w-full border-t bg-white px-6 py-4 mt-auto">
        <div className="max-w-xl mx-auto flex justify-between">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
