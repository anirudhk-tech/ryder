"use client";

import { Button } from "@/components/ui/button";
import { useUiStore } from "@/lib/store/useUiStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminReviewsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    rating: 5,
    comment: "",
    name: "",
    label: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const { setReviewsVersion } = useUiStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setMessage(null);

      const res = await fetch("/api/assets/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        setMessage("Failed to add review.");
        return;
      }

      const data = await res.json();
      setReviewsVersion(data.version);

      setFormData({
        rating: 5,
        comment: "",
        name: "",
        label: "",
      });

      setMessage("Review added successfully!");
    } catch (err) {
      setMessage("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <main className="bg-black min-h-screen w-full flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md bg-black border border-white rounded-lg p-6">
        <h1 className="text-2xl font-bold text-white mb-4">Add Review</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-white uppercase tracking-wide mb-1">
              Rating
            </label>
            <input
              type="number"
              name="rating"
              min="1"
              max="5"
              value={formData.rating}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-black border border-white text-white rounded-sm focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-white uppercase tracking-wide mb-1">
              Comment
            </label>
            <textarea
              name="comment"
              rows={4}
              value={formData.comment}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-black border border-white text-white rounded-sm focus:outline-none focus:ring-2 focus:ring-white resize-vertical"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-white uppercase tracking-wide mb-1">
              Customer
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-black border border-white text-white rounded-sm focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div>
            <label className="block text-sm text-white uppercase tracking-wide mb-1">
              Job (Optional)
            </label>
            <input
              type="text"
              name="label"
              value={formData.label}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-black border border-white text-white rounded-sm focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="h-12 w-full bg-white text-black font-bold rounded-sm text-lg hover:bg-white hover:-translate-y-0.5 transition-transform"
          >
            {submitting ? "Adding..." : "Add Review"}
          </Button>

          <Button
            type="button"
            onClick={() => router.push("/admin/reviews/edit")}
            variant="outline"
            className="h-12 w-full bg-white font-bold rounded-sm text-lg hover:bg-white hover:-translate-y-0.5 transition-transform"
          >
            Edit Reviews
          </Button>

          <Button
            type="button"
            onClick={() => router.push("/admin")}
            variant="outline"
            className="h-10 w-full border border-white bg-black text-white rounded-sm text-sm hover:bg-white transition-colors"
          >
            ← Back to Dashboard
          </Button>

          {message && (
            <p
              className={`text-sm mt-2 ${message.includes("success") ? "text-green-400" : "text-white"}`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
