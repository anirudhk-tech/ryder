"use client";
import { useEffect } from "react";

export default function BarberPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "https://app.cal.com/bookings/upcoming";
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center w-full h-screen bg-black text-white">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-6" />

      <span className="text-lg font-semibold animate-pulse">
        Redirecting to bookings...
      </span>
    </main>
  );
}
