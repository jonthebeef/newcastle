"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ActivateButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleActivate = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/mock/activate", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to activate");
      }

      // Refresh the page to update the user's state
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <button
        onClick={handleActivate}
        disabled={loading}
        className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? "Activating..." : "Activate Access"}
      </button>
      {error && (
        <p className="mt-2 text-red-600 text-sm">{error}</p>
      )}
    </div>
  );
}
