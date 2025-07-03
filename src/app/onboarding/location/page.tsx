"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ukCities = [
  "London",
  "Manchester",
  "Birmingham",
  "Leeds",
  "Glasgow",
  "Liverpool",
  "Bristol",
  "Sheffield",
  "Edinburgh",
  "Cardiff",
  "Belfast",
];

export default function LocationPage() {
  const { data: session, update } = useSession();
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Prefill city if exists
  useEffect(() => {
    if (session?.user?.id) {
      fetch("/api/onboarding/location")
        .then((res) => res.json())
        .then((data) => {
          console.log("Prefilled city:", data.city);
          if (data.city) setCity(data.city);
        })
        .catch(() => console.log("City prefill failed"));
    }
  }, [session?.user?.id]);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.latitude}&lon=${coords.longitude}`
          );
          const data = await res.json();
          const detectedCity = data.address.city || data.address.town || "";
          setCity(detectedCity);
        } catch {
          setError("Couldn’t access your location. Please select manually.");
        }
      },
      () => setError("Couldn’t access your location. Please select manually.")
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/onboarding/location", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city }),
      });

      if (!res.ok) throw new Error("Failed to save location");
      await update(); // refresh session with new onboardingStep
      router.push("/onboarding/profile");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-100px)] bg-primary-50">
      {" "}
      {/* 100px - приблизна висота Header */}
      {/* Progress bar */}
      <div className="w-full h-2 bg-primary-100  px-5 rounded">
        <div className="h-2 bg-primary-500 w-[40%] rounded" />
      </div>
      <div className="text-sm text-gray-600 text-right px-4 py-1">
        Step 4 of 10
      </div>
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-xl bg-white rounded-xl p-6 shadow">
          <h1 className="text-xl font-bold text-gray-900 mb-4">
            Tell us where you are
          </h1>
          <h2>
            This helps us match you with jobs and support services nearby.
          </h2>
          <h2>
            You can choose from the list, type your location, or use your
            current one.
          </h2>

          {error && (
            <p className="mb-2 text-red-600 text-sm bg-red-100 p-2 rounded-md">
              {error}
            </p>
          )}
          <form id="location-form" onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Enter or select your city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                list="uk-cities"
                className="w-full rounded-md border border-gray-300 px-4 py-2 pr-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <datalist id="uk-cities">
                {ukCities.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
              <button
                type="button"
                onClick={detectLocation}
                className="absolute top-1/2 right-2 -translate-y-1/2 rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
              >
                Detect
              </button>
            </div>
          </form>
        </div>
      </main>
      <footer className="bg-white border-t border-gray-300 py-4 px-4">
        <div className="max-w-xl mx-auto flex justify-center">
          {/* <button className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800">
            Back
          </button> */}
          <button
            type="submit"
            form="location-form"
            className="w-auto rounded-md bg-primary-500 py-2 px-4 text-gray-25 hover:bg-primary-700 transition"
            disabled={loading}
          >
            {loading ? "Saving..." : "Continue"}
          </button>
        </div>
      </footer>
    </div>
  );
}
