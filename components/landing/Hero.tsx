"use client";

import { useUiStore } from "@/lib/store/useUiStore";
import Image from "next/image";
import { useEffect } from "react";

export default function Hero() {
  const { logoPictureVersion, setLogoPictureVersion } = useUiStore();

  useEffect(() => {
    const mountLogo = async () => {
      const res = await fetch("/api/assets/logo");
      const data = await res.json();
      setLogoPictureVersion(data.version);
    };
    mountLogo();
  }, [setLogoPictureVersion]);

  return (
    <div className="relative grid place-items-center">
      <div className="w-screen h-[50vh] overflow-none" />{" "}
      {/* Spacer to reserve space */}
      {/*<RotatingThreeJSModel />*/}
      <Image
        src={`/assets/logo.png?v=${logoPictureVersion}`}
        alt="Logo Image"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
    </div>
  );
}
