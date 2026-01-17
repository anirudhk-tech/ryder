import { motion } from "framer-motion";
import Link from "next/link";
import { FaTiktok, FaInstagram } from "react-icons/fa";
import { GrMap } from "react-icons/gr";

const MAP_URL = "https://maps.app.goo.gl/vFVxJECCAnuxGpAe7";

export const FloatingIcons = ({ animate = false }: { animate?: boolean }) => (
  <div className="flex items-center text-2xl gap-2 mt-auto z-10">
    {animate ? (
      <motion.div
        animate={{ y: [0, -4, 0], opacity: [0, 1] }}
        transition={{
          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          },
          opacity: {
            duration: 1,
            ease: "easeInOut",
            delay: 1,
          },
        }}
      >
        <Link
          href="https://www.tiktok.com/@ryder"
          target="_blank"
          aria-label="TikTok"
        >
          <FaTiktok className="text-2xl text-white" />
        </Link>
      </motion.div>
    ) : (
      <Link
        href="https://www.tiktok.com/@ryder"
        target="_blank"
        aria-label="TikTok"
      >
        <FaTiktok className="text-2xl text-white" />
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
            delay: 1,
          },
          opacity: {
            duration: 1,
            ease: "easeInOut",
            delay: 1.5,
          },
        }}
      >
        <Link
          href="https://www.instagram.com/0017_ryder/"
          target="_blank"
          aria-label="Instagram"
        >
          <FaInstagram className="text-2xl text-white" />
        </Link>
      </motion.div>
    ) : (
      <Link
        href="https://www.instagram.com/0017_ryder/"
        target="_blank"
        aria-label="Instagram"
      >
        <FaInstagram className="text-2xl text-white" />
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
            delay: 1.5,
          },
          opacity: {
            duration: 1,
            ease: "easeInOut",
            delay: 2,
          },
        }}
      >
        <Link href={MAP_URL} target="_blank" aria-label="Map">
          <GrMap className="text-2xl text-white" />
        </Link>
      </motion.div>
    ) : (
      <Link href={MAP_URL} target="_blank" aria-label="Map">
        <GrMap className="text-2xl text-white" />
      </Link>
    )}
  </div>
);
