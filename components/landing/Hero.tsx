"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative grid place-items-center">
      <div className="w-[100vw] h-[50vh] overflow-none" />{" "}
      {/* Spacer to reserve space */}
      {/*<RotatingThreeJSModel />*/}
      <Image
        src="/background.png"
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
    </div>
  );
}
