"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

type ShowcaseImage = {
  id: string;
  url: string;
  uploadedAt: string;
};

export default function ShowcasePage() {
  const router = useRouter();
  const [images, setImages] = useState<ShowcaseImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // Fetch images on mount
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await fetch("/api/assets/showcase", { cache: "no-store" });
      const data = await res.json();
      if (data.images) {
        setImages(data.images);
      }
    } catch {
      setMessage("Failed to load images");
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();
    for (const file of Array.from(files)) {
      formData.append("files", file);
    }

    try {
      setUploading(true);
      setMessage(null);

      const res = await fetch("/api/assets/showcase", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        setMessage("Failed to upload images");
        return;
      }

      const data = await res.json();
      setMessage(`Uploaded ${data.count} image(s)!`);
      
      // Refresh the list
      await fetchImages();
    } catch {
      setMessage("Something went wrong");
    } finally {
      setUploading(false);
      // Reset the input
      e.target.value = "";
    }
  };

  const handleDelete = async (imageUrl: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      setDeleting(imageUrl);
      setMessage(null);

      const res = await fetch(
        `/api/assets/showcase?url=${encodeURIComponent(imageUrl)}`,
        { method: "DELETE" }
      );

      if (!res.ok) {
        setMessage("Failed to delete image");
        return;
      }

      setMessage("Image deleted!");
      // Remove from local state
      setImages((prev) => prev.filter((img) => img.url !== imageUrl));
    } catch {
      setMessage("Something went wrong");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <main className="bg-black min-h-screen w-full flex flex-col items-center p-8">
      <div className="w-full max-w-4xl">
        <div className="bg-black border border-white rounded-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-white mb-4">
            Manage Showcase
          </h1>

          {/* Upload Section */}
          <div className="mb-6">
            <label className="flex flex-col gap-2 text-white">
              <span className="text-sm uppercase tracking-wide">
                Upload images
              </span>
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                multiple
                disabled={uploading}
                onChange={handleUpload}
                className="block w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-gray-200 disabled:opacity-50"
              />
            </label>
            {uploading && (
              <p className="text-sm text-white/70 mt-2">Uploading...</p>
            )}
          </div>

          <Button
            type="button"
            onClick={() => router.push("/admin")}
            variant="outline"
            className="h-10 w-full border border-white bg-black text-white rounded-sm text-sm hover:bg-white hover:text-black transition-colors"
          >
            ← Back to Dashboard
          </Button>

          {message && <p className="text-sm text-white mt-4">{message}</p>}
        </div>

        {/* Image Grid */}
        <div className="bg-black border border-white rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">
            Current Images ({images.length})
          </h2>

          {images.length === 0 ? (
            <p className="text-white/50 text-center py-8">
              No showcase images yet. Upload some above!
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="relative group rounded-lg overflow-hidden border border-white/20"
                >
                  <div className="aspect-[3/4] relative">
                    <Image
                      src={image.url}
                      alt="Showcase"
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                      className="object-cover"
                    />
                  </div>

                  {/* Overlay with delete button */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      onClick={() => handleDelete(image.url)}
                      disabled={deleting === image.url}
                      className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1"
                    >
                      {deleting === image.url ? "..." : "🗑️ Delete"}
                    </Button>
                  </div>

                  {/* Upload date */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-2 py-1">
                    <p className="text-xs text-white/70 truncate">
                      {new Date(image.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
