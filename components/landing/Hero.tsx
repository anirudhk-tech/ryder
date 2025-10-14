"use client";

import RotatingThreeJSModel from "../RotatingThreeJSModel";

export default function Hero() {
  return (
    <div className="relative grid place-items-center">
      <div className="w-[100vw] h-[50vh] overflow-none" />{" "}
      {/* Spacer to reserve space */}
      <RotatingThreeJSModel />
    </div>
  );
}
