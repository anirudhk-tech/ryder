import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto bg-[#1a1000]">
      <Link
        href="/"
        className="[font-family:var(--font-press)] text-2xl font-black text-white"
      >
        RYDER
      </Link>

      <Link
        href="/"
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-white text-black`}
      >
        ← Back Home
      </Link>
    </nav>
  );
};
