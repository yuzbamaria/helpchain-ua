"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { XIcon } from "lucide-react";
import ProgressBar from "@/components/ProgressBar";
import ArrowRight from "@/icons/ArrowRight";
import ArrowLeft from "@/icons/ArrowLeft";
import TooltipIcon from "@/components/TooltipIcon";
import Input from "@/components/Input";

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
  const [loading, setLoading] = useState(false);
  const [showSkills, setShowSkills] = useState(false);

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
      } catch (err) {
        console.error("Failed to load profession data");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (showSkills) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showSkills]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
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
      setLoading(false);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col  bg-primary-50">
      <ProgressBar percent={60} stepInfo="Step 6 of 10" />
      <main className="flex-1 flex flex-col gap-4 items-center justify-center px-6">
        {error && (
          <p className="text-sm text-red-600 bg-red-100 p-2 rounded">{error}</p>
        )}
        <h1 className="text-2xl font-bold mb-4 font-montserrat">
          Profession & Skills
        </h1>
        <div className="font-karla pb-8 text-center">
          <p>
            Tell us about your profession, skills, and what you’re looking for.
          </p>
        </div>

        <form
          id="onbord-profession-form"
          onSubmit={handleSubmit}
          className="w-full md:w-2xl lg:w-3xl space-y-4 text-gray-300 font-semibold font-karla mb-20"
        >
          <Input
            label="Current Role"
            placeholder="e.g. Waiter, Builder"
            name="currentRole"
            type="text"
            value={currentRole}
            onChange={(e) => setCurrentRole(e.target.value)}
            inputIcon={
              <TooltipIcon
                message="Used to recommend opportunities and training relevant for you."
                position="left"
              />
            }
          />

          <Input
            label="Desired Role"
            placeholder="e.g. Supervisor, Plumber"
            name="desiredRole"
            type="text"
            value={desiredRole}
            onChange={(e) => setDesiredRole(e.target.value)}
            inputIcon={
              <TooltipIcon
                message="Used to recommend opportunities and training relevant for you."
                position="left"
              />
            }
          />

          {/* Skills */}
          <div>
            <label className="flex justify-left gap-4 items-center text-base font-bold text-gray-900 mb-1">
              Skills
              <TooltipIcon
                message="Used to recommend opportunities and training relevant for you."
                position="right"
              />
            </label>
            {/* Selected skills shown as chips */}
            <div className="mt-1 flex flex-wrap gap-2 bg-white p-4 rounded border border-gray-300 mb-2">
              {selectedSkills.map((skill) => (
                <span
                  key={skill}
                  className="flex items-center gap-1 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-base"
                >
                  {skill}
                  <XIcon
                    size={15}
                    className="cursor-pointer hover:text-primary-200"
                    onClick={() => toggleSkill(skill)}
                  />
                </span>
              ))}
            </div>
            {/* Choose Skills */}
            <button
              type="button"
              onClick={() => setShowSkills(true)}
              className="px-3 py-1 bg-primary-200 hover:bg-primary-500  hover:text-white text-primary-800 rounded"
            >
              {selectedSkills.length
                ? `Click to choose skills (${selectedSkills.length})`
                : "Click to choose skills"}
            </button>
            <div
              className={`fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300 ${
                showSkills
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <div
                className={`bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg relative transition-transform duration-300 ${
                  showSkills ? "scale-100" : "scale-95"
                }`}
              >
                <button
                  type="button"
                  className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
                  onClick={() => setShowSkills(false)}
                >
                  ✕
                </button>
                <h2 className="text-xl text-primary-800 font-bold mb-4">
                  Choose Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {availableSkills.map((skill) => (
                    <button
                      type="button"
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1 text-sm rounded-full border ${
                        selectedSkills.includes(skill)
                          ? "bg-primary-200 text-primary-700"
                          : "bg-primary-50 text-primary-700 border-gray-300"
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Willing to retrain */}
          <div>
            <label className="flex justify-left items-center text-base font-bold gap-2 text-gray-900 mb-1">
              Willing to retrain?
              <TooltipIcon
                message="Are you open to learning new skills or switching professions?"
                position="top"
              />
            </label>
            <div className="flex gap-10 mt-2 text-gray-700">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="retrain"
                  value="yes"
                  checked={willingToTrain === "yes"}
                  onChange={() => setWillingToTrain("yes")}
                  className="h-5 w-5"
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
                  className="h-5 w-5"
                />
                No
              </label>
            </div>
          </div>

          {/* Willing to relocate */}
          <div>
            <label className="flex justify-left items-center text-base font-bold gap-2 text-gray-900 mb-1">
              Willing to relocate?
            </label>
            <div className="flex gap-10 mt-2 text-gray-700">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="relocate"
                  value="yes"
                  checked={willingToRelocate === "yes"}
                  onChange={() => setWillingToRelocate("yes")}
                  className="h-5 w-5"
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
                  className="h-5 w-5"
                />
                No
              </label>
            </div>
          </div>
        </form>
      </main>
      <footer className="bg-white border-t-2 border-primary-300 py-4 px-4 item-center">
        <div className="max-w-xl mx-auto flex justify-center font-karla gap-4">
          <button
            type="button"
            onClick={() => router.push("/onboarding/profile")}
            className="px-4 py-2 rounded bg-white hover:bg-primary-200 text-primary-500 font-bold"
          >
            <div className="flex items-center gap-2 font-bold">
              <ArrowLeft className="w-5 h-5" />
              Back
            </div>
          </button>
          <button
            type="submit"
            form="onbord-profession-form"
            className="w-auto rounded-md bg-primary-500 py-2 px-5 text-gray-25 hover:bg-primary-700 transition"
            disabled={loading}
          >
            {loading ? (
              "Saving..."
            ) : (
              <div className="flex items-center gap-2 font-bold">
                Continue
                <ArrowRight className="w-5 h-5" />
              </div>
            )}
          </button>
        </div>
      </footer>
    </div>
  );
}
