"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useUiStore } from "@/lib/store/useUiStore";
import TypingText from "@/components/TypingText";
import Footer from "@/components/landing/Footer";
import { Navbar } from "@/components/Navbar";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const { reviewsVersion, setReviewsVersion } = useUiStore();

  // Form state
  const [name, setName] = useState("");
  const [label, setLabel] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchReviews();
  }, [reviewsVersion]);

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/assets/reviews", { cache: "no-store" });
      const data = await res.json();
      setReviews(data.reviews || []);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !comment.trim()) {
      setSubmitMessage("Please fill in your name and review.");
      return;
    }

    setSubmitting(true);
    setSubmitMessage(null);

    try {
      const res = await fetch("/api/assets/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          label: label.trim(),
          rating,
          comment: comment.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit review");
      }

      const data = await res.json();
      setReviewsVersion(data.version);
      
      // Clear form
      setName("");
      setLabel("");
      setRating(5);
      setComment("");
      setSubmitMessage("Thanks for your review! 🎉");
      
      // Refresh reviews
      fetchReviews();
    } catch (err) {
      console.error("Failed to submit review:", err);
      setSubmitMessage("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen w-full bg-[#1a1000] text-white">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(1200px_500px_at_10%_0%,rgba(0,160,255,0.12),transparent_60%),radial-gradient(800px_500px_at_90%_10%,rgba(255,0,200,0.10),transparent_60%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_30%),repeating-linear-gradient(45deg,rgba(255,255,255,0.03)_0_10px,rgba(255,255,255,0.05)_10px_20px),linear-gradient(180deg,#0a0a0a,#0c0c0c)]" />
          <div className="absolute inset-0 opacity-25 mix-blend-multiply bg-[repeating-linear-gradient(to_bottom,rgba(0,0,0,0.18),rgba(0,0,0,0.18)_1px,rgba(0,0,0,0)_3px,rgba(0,0,0,0)_4px)]" />
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.55)]" />
        </div>

        <header className="mx-auto max-w-7xl px-4 py-10 flex flex-col text-center">
          <TypingText
            className="[font-family:var(--font-press)] text-3xl font-black tracking-tight drop-shadow-[0_0_14px_rgba(255,255,0,1.0)]"
            text="CUSTOMER REVIEWS"
          />
          <p className="text-white/60 max-w-md mx-auto text-lg mt-4">
            Don't just take my word for it
          </p>
        </header>

        {/* Side-by-side layout: Reviews on left, Form on right */}
        <main className="mx-auto max-w-7xl px-4 pb-24">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Reviews List - Left Side */}
            <div className="flex-1 order-2 lg:order-1">
              {loading ? (
                <div className="text-center py-24 text-white/50">
                  Loading reviews...
                </div>
              ) : reviews.length === 0 ? (
                <div className="text-center py-24 text-white/50">
                  No reviews yet. Be the first to leave one!
                </div>
              ) : (
                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {reviews.map((review: any, i: number) => (
                    <li key={review.id} className="relative">
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.985 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.2, delay: i * 0.05 }}
                        className="relative rounded-2xl bg-black/30 border border-white/20 p-6 h-full"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, starIndex) => (
                              <span
                                key={starIndex}
                                className={`text-base ${
                                  starIndex < review.rating
                                    ? "text-yellow-400 drop-shadow-[0_0_4px_rgba(255,215,0,0.8)]"
                                    : "text-white/40"
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="text-sm font-medium text-white/80">
                            {review.name || "Anonymous"}
                          </span>
                        </div>

                        {review.label && (
                          <div className="mb-3">
                            <span className="inline-block bg-linear-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400/30 px-2 py-0.5 text-xs rounded-sm font-bold uppercase tracking-wide text-yellow-300">
                              {review.label}
                            </span>
                          </div>
                        )}

                        {review.comment && (
                          <p className="text-white/90 leading-relaxed text-base mb-3">
                            "{review.comment}"
                          </p>
                        )}

                        <div className="text-xs text-white/50">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </div>
                      </motion.div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Add Review Form - Right Side (sticky) */}
            <div className="w-full lg:w-96 order-1 lg:order-2">
              <div className="lg:sticky lg:top-24">
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="rounded-2xl bg-black/40 border border-white/20 p-6"
                >
                  <h2 className="text-xl font-bold mb-5 text-yellow-300">
                    Leave a Review
                  </h2>

                  <div className="grid gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/30 transition-colors"
                      />
                    </div>

                    {/* Label */}
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1.5">
                        Title / Occupation
                      </label>
                      <input
                        type="text"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        placeholder="e.g. Student, Engineer"
                        className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/30 transition-colors"
                      />
                    </div>

                    {/* Rating */}
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1.5">
                        Rating *
                      </label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className={`text-2xl transition-all hover:scale-110 ${
                              star <= rating
                                ? "text-yellow-400 drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]"
                                : "text-white/30 hover:text-white/50"
                            }`}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Comment */}
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1.5">
                        Your Review *
                      </label>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your experience..."
                        rows={4}
                        className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/30 transition-colors resize-none"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-2.5 px-6 rounded-lg hover:from-yellow-400 hover:to-orange-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? "Submitting..." : "Submit Review"}
                    </button>

                    {submitMessage && (
                      <p
                        className={`text-center text-sm ${
                          submitMessage.includes("Thanks")
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {submitMessage}
                      </p>
                    )}
                  </div>
                </motion.form>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
