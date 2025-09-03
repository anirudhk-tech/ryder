// components/Socials.tsx
import Link from "next/link";
import { FaTiktok } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <div className="flex items-center text-2xl gap-2 mt-auto">
        <Link
          href="https://www.tiktok.com/@ryder"
          target="_blank"
          aria-label="TikTok"
        >
          <FaTiktok />
        </Link>
        <Link
          href="https://www.instagram.com/0017_ryder/"
          target="_blank"
          aria-label="Instagram"
        >
          <FaInstagram />
        </Link>
      </div>

      <div className="[font-family:var(--font-press)] text-[7px] mt-auto">
        © {new Date().getFullYear()} Ryder - All rights reserved
      </div>
    </>
  );
}
