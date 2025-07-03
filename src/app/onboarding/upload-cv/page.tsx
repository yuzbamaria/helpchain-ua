"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function UploadCVPage() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { update } = useSession();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (
      selected &&
      ![
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(selected.type)
    ) {
      setError("Unsupported file type. Please upload a PDF or DOC.");
      return;
    }
    setError("");
    setFile(selected || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file or click 'Skip for now'.");
      return;
    }

    const formData = new FormData();
    formData.append("cv", file);

    setLoading(true);
    try {
      const res = await fetch("/api/onboarding/upload-cv", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      await update();
      router.push("/onboarding/language");
    } catch {
      setError("Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    router.push("/onboarding/language");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white p-8 rounded-lg shadow space-y-6"
      >
        {/* Step progress */}
        <div>
          <div className="text-sm text-gray-600 mb-1">Step 7 of 10</div>
          <div className="h-2 bg-blue-100 rounded-full">
            <div className="h-2 bg-blue-600 rounded-full w-[70%]" />
          </div>
        </div>

        <h1 className="text-2xl font-bold">Upload your CV</h1>
        <p className="text-gray-600">
          Attach your most recent CV to help us match you with jobs.
        </p>

        {error && (
          <p className="text-red-600 bg-red-100 p-2 rounded text-sm">{error}</p>
        )}

        {/* File input */}
        <label
          htmlFor="cv-upload"
          className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400"
        >
          <input
            id="cv-upload"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
          {file ? (
            <span className="text-blue-600 font-medium">{file.name}</span>
          ) : (
            <span className="text-gray-600">
              Click to upload or drag and drop
              <br />
              <span className="text-sm text-gray-400">
                Supported formats: PDF, DOC
              </span>
            </span>
          )}
        </label>

        {/* Skip link */}
        <div className="text-right">
          <button
            type="button"
            onClick={handleSkip}
            className="text-sm text-blue-600 hover:underline"
          >
            Skip for now
          </button>
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            {loading ? "Uploading..." : "Upload and continue"}
          </button>
        </div>
      </form>
    </div>
  );
}
