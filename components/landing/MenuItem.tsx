// components/MenuItem.tsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function MenuItem({
  onClick,
  label,
}: {
  onClick?: () => void;
  label: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <li
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="flex flex-row"
    >
      <motion.span
        aria-hidden
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

      <span className="[font-family:var(--font-press)]">{label}</span>
    </li>
  );
}
