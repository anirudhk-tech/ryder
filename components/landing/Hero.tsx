"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative grid place-items-center">
      {/* Main image */}
      <Image
        src="/Hero.png"
        alt="Ryder Cuts"
        width={400}
        height={100}
        priority
        className="relative z-0 object-cover"
      />
    </div>
  );
}
