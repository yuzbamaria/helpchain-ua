"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

export default function ProfilePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
  });
  const [error, setError] = useState("");

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
    } else {
      setError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-xl mx-auto bg-white rounded-xl p-6 shadow">
        <div className="mb-4">
          <div className="h-2 bg-blue-100 rounded-full">
            <div className="h-2 bg-blue-700 rounded-full w-[50%]" />
          </div>
          <p className="mt-2 text-sm text-gray-600">Step 5 of 10</p>
        </div>
        <h1 className="text-xl font-bold mb-4">Profile Setup</h1>

        {error && <p className="text-red-600">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full rounded border px-4 py-2"
          />
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full rounded border px-4 py-2"
          />
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="Age"
            className="w-full rounded border px-4 py-2"
          />
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full rounded border px-4 py-2"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => router.push("/onboarding/location")}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
