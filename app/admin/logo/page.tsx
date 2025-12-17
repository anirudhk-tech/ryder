"use client";

import { Button } from "@/components/ui/button";
import { useUiStore } from "@/lib/store/useUiStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BackgroundPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const { setLogoPictureVersion } = useUiStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please choose an image.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      setMessage(null);

      const res = await fetch("/api/assets/logo", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        setMessage("Failed to update logo.");
        return;
      }

      const data = await res.json();

      setLogoPictureVersion(data.version);
      setMessage("Logo updated!");
    } catch (err) {
      setMessage("Something went wrong.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="bg-black min-h-screen w-full flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md bg-black border border-white rounded-lg p-6">
        <h1 className="text-2xl font-bold text-white mb-4">Update Logo</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-2 text-white">
            <span className="text-sm uppercase tracking-wide">
              Choose image
            </span>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="block w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-gray-200"
              onChange={(e) => {
                const f = e.target.files?.[0] ?? null;
                setFile(f);
              }}
            />
          </label>

          <Button
            type="submit"
            disabled={uploading}
            className="h-12 w-full bg-white text-black font-bold rounded-sm text-lg hover:bg-white hover:-translate-y-0.5 transition-transform"
          >
            {uploading ? "Uploading..." : "Save Logo"}
          </Button>

          <Button
            type="button"
            onClick={() => router.push("/admin")}
            variant="outline"
            className="h-10 w-full border border-white bg-black text-white rounded-sm text-sm hover:bg-white hover:text-black transition-colors"
          >
            ← Back to Dashboard
          </Button>

          {message && <p className="text-sm text-white mt-2">{message}</p>}
        </form>
      </div>
    </main>
  );
}
