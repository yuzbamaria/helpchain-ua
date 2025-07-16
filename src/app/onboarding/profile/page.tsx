"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "@/components/ProgressBar";
import ArrowRight from "@/icons/ArrowRight";
import ArrowLeft from "@/icons/ArrowLeft";
import TooltipIcon from "@/components/TooltipIcon";
import Input from "@/components/Input";
import Select from "@/components/Select";

export default function ProfilePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch profile data
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/onboarding/profile");
      if (res.ok) {
        const data = await res.json();
        setForm({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          age: data.age?.toString() || "",
          gender: data.gender || "",
        });
      }
    };
    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/onboarding/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        age: parseInt(form.age),
      }),
    });

    if (res.ok) {
      router.push("/onboarding/profession");
      setLoading(false);
    } else {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col bg-primary-50 ">
      <ProgressBar percent={50} stepInfo="Step 5 of 10" />
      <main className="flex-1 flex flex-col items-center justify-center p-6 max-w-2xl m-auto pb-10">
        {error && <p className="text-red-600">{error}</p>}
        <h1 className="text-2xl font-bold mb-4 font-montserrat">
          Tell us about yourself
        </h1>
        <div className="font-karla mb-10 text-center">
          <p>This helps us connect you with the right opportunities.</p>
        </div>

        <form
          id="onbord-profile-form"
          onSubmit={handleSubmit}
          className="w-full md:w-2xl lg:w-3xl space-y-4 text-gray-300 font-semibold font-karla mb-20"
        >
          <Input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First name"
            label="First name"
          />

          <Input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last name"
            label="Last name"
          />

          <Input
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="Age"
            label="Age"
            type="number"
            labelTooltip={
              <TooltipIcon
                message="Used to recommend opportunities and training relevant for you."
                position="right"
              />
            }
          />
          <Select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            label="Gender"
            labelTooltip={
              <TooltipIcon
                message="Optional. Used to support inclusive hiring only."
                position="right"
              />
            }
            placeholder="Select gender"
            options={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
              { label: "Other", value: "other" },
            ]}
          />
        </form>
      </main>

      <footer className="bg-white border-t-2 border-primary-300 py-4 px-4">
        <div className="max-w-xl mx-auto flex justify-center font-karla gap-4">
          <button
            type="button"
            onClick={() => router.push("/onboarding/location")}
            className="px-4 py-2 rounded bg-white hover:bg-primary-200 text-primary-500 font-bold"
          >
            <div className="flex items-center gap-2 font-bold">
              <ArrowLeft className="w-5 h-5" />
              Back
            </div>
          </button>
          <button
            type="submit"
            form="onbord-profile-form"
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
