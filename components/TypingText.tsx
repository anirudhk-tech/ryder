"use client";

import React, { useState, useEffect } from "react";

interface TypingTextProps {
  text: string;
  speed?: number;
  loop?: boolean;
  className?: string;
  delay?: number;
}

export default function TypingText({
  text,
  speed = 50,
  loop = false,
  className = "",
  delay = 0,
}: TypingTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(delay === 0);

  useEffect(() => {
    if (!started && delay > 0) {
      const timeout = setTimeout(() => setStarted(true), delay);
      return () => clearTimeout(timeout);
    }
  }, [started, delay]);

  useEffect(() => {
    if (!started) return;

    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (loop) {
      const timeout = setTimeout(() => {
        setDisplayed("");
        setIndex(0);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed, loop, delay, started]);

  return <span className={className}>{displayed}</span>;
}
