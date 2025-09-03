// components/MenuItem.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function MenuItem({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <li>
      <Link
        href={href}
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
      </Link>
    </li>
  );
}
