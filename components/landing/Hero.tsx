"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroBillboard() {
  return (
    <div className="relative grid place-items-center">
      {/* Pulsing border wrapper */}
      <motion.div
        className="absolute rounded-xl border-4 border-[#FFE62E]"
        initial={{ scale: 1, opacity: 1 }}
        animate={{ scale: 1.2, opacity: 0 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
        }}
        style={{ width: 540, height: 240 }}
      />

      {/* Static border for consistency */}
      <div
        className="absolute w-[90vw]rounded-xl border-2 border-[#FFE62E]/70"
        style={{ width: 520, height: 220 }}
      />

      {/* Main image */}
      <Image
        src="/hero.png"
        alt="Ryder Cuts"
        width={520}
        height={220}
        priority
        className="w-[min(68vw,520px)] h-[50vh]"
      />
    </div>
  );
}
