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
  const { reviewsVersion } = useUiStore();

  useEffect(() => {
    fetchReviews();
  }, [reviewsVersion]);

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/assets/reviews");
      const data = await res.json();
      setReviews(data.reviews || []);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    } finally {
      setLoading(false);
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

        <main className="mx-auto max-w-7xl px-4 pb-24">
          {loading ? (
            <div className="text-center py-24 text-white/50">
              Loading reviews...
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-24 text-white/50">
              No reviews yet. Check back soon!
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review: any, i: number) => (
                <li key={review.id} className="relative">
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.2, delay: i * 0.05 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="group relative rounded-2xl bg-black/30 border border-white/20 p-8 h-full"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, starIndex) => (
                          <span
                            key={starIndex}
                            className={`text-lg ${
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
                      <div className="mb-4">
                        <span className="inline-block bg-linear-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400/30 px-3 py-1 text-xs rounded-sm font-bold uppercase tracking-wide text-yellow-300">
                          {review.label}
                        </span>
                      </div>
                    )}

                    {review.comment && (
                      <p className="text-white/90 leading-relaxed text-lg mb-4 line-clamp-4 group-hover:line-clamp-none transition-all duration-300">
                        "{review.comment}"
                      </p>
                    )}

                    <div className="text-xs text-white/60 mt-auto flex justify-between items-center">
                      <span>
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                      {review.productId && (
                        <span className="font-mono bg-white/10 px-2 py-1 rounded">
                          {review.productId}
                        </span>
                      )}
                    </div>
                  </motion.div>
                </li>
              ))}
            </ul>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}
