import { motion } from "framer-motion";
import Link from "next/link";
import { FaTiktok, FaInstagram } from "react-icons/fa";

export const FloatingIcons = ({ animate = false }: { animate?: boolean }) => (
  <div className="flex items-center text-2xl gap-2 mt-auto">
    {animate ? (
      <motion.div
        animate={{ y: [0, -4, 0], opacity: [0, 1] }}
        transition={{
          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          },
          opacity: {
            duration: 1,
            ease: "easeInOut",
            delay: 2.5,
          },
        }}
      >
        <Link
          href="https://www.tiktok.com/@ryder"
          target="_blank"
          aria-label="TikTok"
        >
          <FaTiktok className="text-2xl" />
        </Link>
      </motion.div>
    ) : (
      <Link
        href="https://www.tiktok.com/@ryder"
        target="_blank"
        aria-label="TikTok"
      >
        <FaTiktok className="text-2xl" />
      </Link>
    )}

    {animate ? (
      <motion.div
        animate={{ y: [0, -4, 0], opacity: [0, 1] }}
        transition={{
          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5,
          },
          opacity: {
            duration: 1,
            ease: "easeInOut",
            delay: 2.5,
          },
        }}
      >
        <Link
          href="https://www.instagram.com/0017_ryder/"
          target="_blank"
          aria-label="Instagram"
        >
          <FaInstagram className="text-2xl" />
        </Link>
      </motion.div>
    ) : (
      <Link
        href="https://www.instagram.com/0017_ryder/"
        target="_blank"
        aria-label="Instagram"
      >
        <FaInstagram className="text-2xl" />
      </Link>
    )}
  </div>
);
