// components/Socials.tsx
import Link from "next/link";
import { FaTiktok } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <div className="flex items-center text-2xl">
        <Link
          href="https://www.tiktok.com/@ryder"
          target="_blank"
          aria-label="TikTok"
        >
          <FaTiktok />
        </Link>
        <span className="text-[#FFE62E]/40">•</span>
        <Link
          href="https://www.instagram.com/ryder"
          target="_blank"
          aria-label="Instagram"
        >
          <FaInstagram />
        </Link>
      </div>

      <div className="[font-family:var(--font-press)] text-[7px]">
        © {new Date().getFullYear()} Ryder - All rights reserved
      </div>
    </>
  );
}
