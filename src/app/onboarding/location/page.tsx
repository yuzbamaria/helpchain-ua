"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ArrowRight from "@/icons/ArrowRight";
import AlertIcon from "@/icons/AlertIcon";
import CitySelect from "@/components/CitySelect";
import ProgressBar from "@/components/ProgressBar";

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
          // console.log("Prefilled city:", data.city);
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
    <div className="min-h-[calc(100vh-100px)] flex flex-col  bg-primary-50">
      <ProgressBar percent={40} stepInfo="Step 4 of 10" />
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-2xl text-black  text-center p-6">
          <h1 className="text-2xl font-bold mb-4 font-montserrat text-center">
            Tell us where you are
          </h1>
          <div className="font-karla text-base">
            <p>
              This helps us match you with jobs and support services nearby.
            </p>
            <p>
              You can choose from the list, type your location, or use your
              current one.
            </p>
          </div>

          <form id="location-form" onSubmit={handleSubmit}>
            <CitySelect
              city={city}
              setCity={setCity}
              detectLocation={detectLocation}
              ukCities={ukCities}
            />
          </form>
          {error && (
            <div className="text-gray-500 font-karla text-left flex flex-row gap-2 items-center justify-start">
              <AlertIcon className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}
        </div>
      </main>
      <footer className="bg-white border-t-2 border-primary-300 py-4 px-4">
        <div className="max-w-xl mx-auto flex justify-center font-karla  gap-4">
          <button
            type="submit"
            form="location-form"
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
