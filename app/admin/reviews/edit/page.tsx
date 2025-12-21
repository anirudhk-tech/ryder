"use client";

import { Button } from "@/components/ui/button";
import { useUiStore } from "@/lib/store/useUiStore";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AdminEditReviewsPage() {
  const router = useRouter();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const { reviewsVersion, setReviewsVersion } = useUiStore();

  useEffect(() => {
    fetchReviews();
  }, [reviewsVersion]);

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/assets/reviews");
      const data = await res.json();
      setReviews(data.reviews || []);
    } catch (err) {
      setMessage("Failed to load reviews.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    try {
      setDeleting(reviewId);
      setMessage(null);

      const res = await fetch("/api/assets/reviews", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reviewId }),
      });

      if (!res.ok) {
        setMessage("Failed to delete review.");
        return;
      }

      const data = await res.json();
      setReviewsVersion(data.version);
      setMessage("Review deleted successfully!");
    } catch (err) {
      setMessage("Something went wrong.");
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <main className="bg-black min-h-screen w-full flex items-center justify-center p-8">
        <div className="text-white text-xl">Loading reviews...</div>
      </main>
    );
  }

  return (
    <main className="bg-black min-h-screen w-full flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-2xl bg-black border border-white rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Edit Reviews</h1>
        </div>

        <div className="flex gap-4 mb-6">
          <Button
            type="button"
            onClick={() => router.push("/admin")}
            variant="outline"
            className="h-10 flex-1 border border-white bg-black text-white rounded-sm text-sm hover:bg-white hover:text-black transition-colors"
          >
            ← Back to Dashboard
          </Button>
        </div>

        {message && (
          <p
            className={`text-sm mb-4 p-3 rounded-sm border ${
              message.includes("success") || message.includes("deleted")
                ? "bg-green-900/50 border-green-400 text-green-400"
                : "bg-red-900/50 border-red-400 text-red-400"
            }`}
          >
            {message}
          </p>
        )}

        {reviews.length === 0 ? (
          <div className="text-center py-12 text-white text-lg">
            No reviews yet.{" "}
            <button
              onClick={() => router.push("/admin/reviews")}
              className="text-blue-400 hover:underline"
            >
              Add the first one
            </button>
            .
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {reviews.map((review: any) => (
              <div
                key={review.id}
                className="bg-black/50 border border-white/50 p-6 rounded-lg flex justify-between items-start gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-yellow-400 font-bold">★</span>
                    <span className="text-lg font-bold text-white">
                      {review.rating}/5
                    </span>
                    <span className="text-sm text-white/70">
                      {review.name || "Anonymous"}
                    </span>
                    <span className="text-xs text-white/50 ml-auto">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-white/90 leading-relaxed">
                    {review.comment}
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={() => handleDelete(review.id)}
                  disabled={deleting === review.id}
                  className="h-10 px-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-sm border-0 transition-colors"
                >
                  {deleting === review.id ? "Deleting..." : "Delete"}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
