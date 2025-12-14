"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import TypingText from "../TypingText";

export default function MenuItem({
  onClickAction,
  label,
  animate = false,
}: {
  onClickAction?: () => void;
  label: string;
  animate?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <li
      onClick={onClickAction}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="flex flex-row cursor-pointer"
    >
      <motion.span
        aria-hidden
        style={{ minWidth: "1ch", display: "inline-block", color: "white" }}
        initial={{ opacity: 0 }}
        animate={
          hovered
            ? {
                opacity: [1, 0, 1],
                transition: { duration: 1, ease: "linear", repeat: Infinity },
              }
            : { opacity: 0 }
        }
      >
        ►
      </motion.span>

      {animate ? (
        <TypingText
          className="[font-family:var(--font-press)] text-white"
          text={label}
          delay={1000}
        />
      ) : (
        <span className="[font-family:var(--font-press)]">{label}</span>
      )}
    </li>
  );
}
