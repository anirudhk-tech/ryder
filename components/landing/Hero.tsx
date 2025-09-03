"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useIsMobile } from "@/lib/hooks/useIsMobile";

function Equalizer({ active }: { active: boolean }) {
  return (
    <div className="flex items-end gap-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="flex flex-col justify-end items-center gap-[2px]"
        >
          {[...Array(3)].map((_, j) => (
            <motion.span
              key={j}
              className="w-3 h-2 bg-[#FFE62E] pixelated"
              animate={
                active
                  ? {
                      opacity: [0.2, 1, 0.2],
                    }
                  : { opacity: 0.2 }
              }
              transition={{
                duration: 0.6,
                repeat: active ? Infinity : 0,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: i * 0.2 + j * 0.05,
              }}
            />
          ))}
        </motion.div>
      ))}
    </div>
  );
}

export default function Hero() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = async () => {
    try {
      if (!audioRef.current) {
        const a = new Audio("/Website.m4a");
        a.loop = true;
        a.volume = 0.6;
        audioRef.current = a;
      }
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error("Audio error:", err);
    }
  };

  return (
    <div className="relative grid place-items-center">
      {/* Main image */}
      <Image
        src="/hero.png"
        alt="Ryder Cuts"
        width={400}
        height={100}
        priority
        className="relative z-0 object-cover"
      />

      {/* Gamey play/pause button */}
      <motion.button
        onClick={toggleMusic}
        whileHover={{ scale: 1.05, boxShadow: "0px 0px 12px #FFE62E" }}
        whileTap={{ scale: 0.95 }}
        className="absolute bottom-0 flex flex-row items-center gap-3 
        bg-black px-4 py-3 border-4 border-[#FFE62E] 
        text-[#FFE62E] [font-family:var(--font-press)]"
      >
        <span className="text-xs">{isPlaying ? "Pause" : "Play"} Beat</span>
        <Equalizer active={isPlaying} />
      </motion.button>
    </div>
  );
}
