"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className=" bg-black min-h-screen w-full flex flex-col items-center justify-center p-8 overflow-hidden relative">
      <div className="relative mb-8">
        <div className="w-24 h-24 bg-white rounded-full mx-auto flex items-center justify-center text-3xl mb-4">
          ✂️
        </div>
        <h1 className="text-3xl md:text-4xl font-bold bg-white bg-clip-text text-transparent drop-shadow-lg">
          Admin Dashboard
        </h1>
        <p className="bg-black text-lg mt-2 font-medium">
          {`Ryder's Barber Shop`}
        </p>
      </div>

      <div className="flex flex-col items-center justify-center w-100 gap-5">
        <Button
          onClick={() => window.open("https://koalander.com/")}
          className="block h-20 w-full bg-white text-black font-bold rounded-sm text-xl transition-all hover:-translate-y-1 hover:bg-white"
        >
          📅 Bookings
        </Button>
        <Button
          onClick={() => router.push("/admin/beats")}
          className="block h-20 w-full bg-white text-black font-bold rounded-sm text-xl transition-all hover:-translate-y-1 hover:bg-white"
        >
          🥁 Beats
        </Button>
        <Button
          onClick={() => router.push("/admin/logo")}
          className="block h-20 w-full bg-white text-black font-bold rounded-sm text-xl transition-all hover:-translate-y-1 hover:bg-white"
        >
          🖼️ Logo
        </Button>
        <Button
          type="button"
          onClick={() => router.push("/")}
          variant="outline"
          className="h-10 w-full border border-white bg-black text-white rounded-sm text-sm hover:bg-white hover:text-black transition-colors"
        >
          ← Back to Website
        </Button>
      </div>
    </main>
  );
}
