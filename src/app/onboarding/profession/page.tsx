"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { HelpCircle, XCircle } from "lucide-react";

export default function ProfessionPage() {
  const router = useRouter();
  const { update } = useSession();

  const [currentRole, setCurrentRole] = useState("");
  const [desiredRole, setDesiredRole] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [willingToTrain, setWillingToTrain] = useState<"yes" | "no" | null>(
    null
  );
  const [willingToRelocate, setWillingToRelocate] = useState<
    "yes" | "no" | null
  >(null);
  const [error, setError] = useState("");

  const availableSkills = [
    "Communication",
    "Teamwork",
    "Problem Solving",
    "Time Management",
    "Leadership",
    "Technical Knowledge",
    "Creativity",
  ];

  // Prefill from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/onboarding/profession");
        const data = await res.json();
        if (data) {
          setCurrentRole(data.currentRole || "");
          setDesiredRole(data.desiredRole || "");
          setSelectedSkills(data.skills || []);
          setWillingToTrain(data.willingToRetrain ? "yes" : "no");
          setWillingToRelocate(data.willingToRelocate ? "yes" : "no");
        }
      } catch {
        console.error("Failed to load profession data");
      }
    };
    fetchData();
  }, []);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/onboarding/profession", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentRole,
          desiredRole,
          selectedSkills,
          willingToTrain,
          willingToRelocate,
        }),
      });

      if (!res.ok) throw new Error("Failed to save");

      await update();
      router.push("/onboarding/upload-cv");
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 flex flex-col items-center">
      <div className="w-full max-w-xl mb-8">
        <div className="mb-2 text-sm text-gray-600">Step 6 of 10</div>
        <div className="w-full h-2 bg-blue-100 rounded">
          <div
            className="h-2 bg-blue-600 rounded"
            style={{ width: "60%" }}
          ></div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white p-8 rounded-lg shadow space-y-6"
      >
        <h1 className="text-2xl font-bold mb-4">Profession & Skills</h1>

        {error && (
          <p className="text-sm text-red-600 bg-red-100 p-2 rounded">{error}</p>
        )}

        {/* Current Role */}
        <div>
          <label className="flex justify-between items-center text-sm font-medium text-gray-700 mb-1">
            Current Role
            <HelpCircle size={16} className="text-gray-400 cursor-pointer" />
          </label>
          <input
            type="text"
            value={currentRole}
            onChange={(e) => setCurrentRole(e.target.value)}
            placeholder="e.g. Waiter, Builder"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Desired Role */}
        <div>
          <label className="flex justify-between items-center text-sm font-medium text-gray-700 mb-1">
            Desired Role
            <HelpCircle size={16} className="text-gray-400 cursor-pointer" />
          </label>
          <input
            type="text"
            value={desiredRole}
            onChange={(e) => setDesiredRole(e.target.value)}
            placeholder="e.g. Supervisor, Plumber"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Skills */}
        <div>
          <label className="flex justify-between items-center text-sm font-medium text-gray-700 mb-1">
            Skills
            <HelpCircle size={16} className="text-gray-400 cursor-pointer" />
          </label>
          <details className="w-full rounded border border-gray-300 px-4 py-2 bg-white">
            <summary className="cursor-pointer text-sm text-gray-700">
              {selectedSkills.length
                ? `Selected (${selectedSkills.length})`
                : "Click to choose skills"}
            </summary>
            <div className="mt-2 flex flex-wrap gap-2">
              {availableSkills.map((skill) => (
                <button
                  type="button"
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`px-3 py-1 text-sm rounded-full border ${
                    selectedSkills.includes(skill)
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </details>

          {/* Selected skills shown as chips */}
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedSkills.map((skill) => (
              <span
                key={skill}
                className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm"
              >
                {skill}
                <XCircle
                  size={16}
                  className="cursor-pointer hover:text-red-500"
                  onClick={() => toggleSkill(skill)}
                />
              </span>
            ))}
          </div>
        </div>

        {/* Willing to retrain */}
        <div>
          <label className="flex justify-between items-center text-sm font-medium text-gray-700 mb-1">
            Willing to retrain?
            <HelpCircle size={16} className="text-gray-400 cursor-pointer" />
          </label>
          <div className="flex gap-4 mt-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="retrain"
                value="yes"
                checked={willingToTrain === "yes"}
                onChange={() => setWillingToTrain("yes")}
              />
              Yes
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="retrain"
                value="no"
                checked={willingToTrain === "no"}
                onChange={() => setWillingToTrain("no")}
              />
              No
            </label>
          </div>
        </div>

        {/* Willing to relocate */}
        <div>
          <label className="flex justify-between items-center text-sm font-medium text-gray-700 mb-1">
            Willing to relocate?
            <HelpCircle size={16} className="text-gray-400 cursor-pointer" />
          </label>
          <div className="flex gap-4 mt-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="relocate"
                value="yes"
                checked={willingToRelocate === "yes"}
                onChange={() => setWillingToRelocate("yes")}
              />
              Yes
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="relocate"
                value="no"
                checked={willingToRelocate === "no"}
                onChange={() => setWillingToRelocate("no")}
              />
              No
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
