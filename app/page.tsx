// app/page.tsx
"use client";

import Hero from "@/components/landing/Hero";
import MenuItem from "@/components/landing/MenuItem";
import Footer from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <main
      className="bg-white max-h-screen gap-6 flex flex-col items-center justify-center"
      role="main"
    >
      <div className="flex flex-col gap-6 items-center px-[clamp(10px,3vw,28px)] text-center">
        <Hero />

        <ul className="flex flex-col items-center gap-[clamp(8px,2.6vh,16px)] m-0 p-0 list-none">
          <MenuItem href="/haircut" label="Haircut" />
          <MenuItem href="/beard" label="Beard" />
          <MenuItem href="/haircut-beard" label="Haircut + Beard" />
          <MenuItem href="/work" label="Ryder's Work" />
        </ul>
      </div>

      <Footer />
    </main>
  );
}
