"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="bg-gradient-to-br bg-black min-h-screen flex items-center justify-center p-8 overflow-hidden relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-black border border-white backdrop-blur-xl rounded-3xl p-12 max-w-md w-full text-center shadow-2xl shadow-slate-900/50 relative overflow-hidden"
      >
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

        <motion.div
          whileHover={{ scale: 1.05, y: -4 }}
          whileTap={{ scale: 0.98 }}
          className="space-y-4 cursor-pointer"
        >
          <Link
            href="https://koalendar.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-gradient-to-r bg-white text-black font-bold py-6 px-8 rounded-2xl text-xl transition-all duration-3000 hover:-translate-y-1"
          >
            📅 Bookings
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
