"use client";

import { useRouter } from "next/navigation";

export default function ThankYouPage() {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/"); // Можеш змінити маршрут при потребі
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 py-10">
      <div className="bg-white max-w-xl w-full p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">
          Thank you – your profile has been submitted!
        </h1>
        <p className="text-gray-700 text-center mb-4">
          We’ve received your information. Our team will review your profile and
          contact you if any suitable opportunities match your skills.
        </p>
        <p className="text-gray-700 text-center mb-6">
          In the meantime, you can follow us on{" "}
          <a
            href="https://www.facebook.com"
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            Facebook
          </a>{" "}
          or{" "}
          <a
            href="https://www.linkedin.com"
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            LinkedIn
          </a>{" "}
          to stay updated on jobs, training, and support for Ukrainians in the
          UK.
        </p>
        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={handleContinue}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
