"use client";

import { useUiStore } from "@/lib/store/useUiStore";
import Image from "next/image";
import { useEffect } from "react";

export default function Hero() {
  const { logoUrl, logoPictureVersion, setLogoPicture } = useUiStore();

  useEffect(() => {
    const fetchLogo = async () => {
      const res = await fetch("/api/assets/logo", { cache: "no-store" });
      const data = await res.json();
      setLogoPicture(data.version, data.url);
    };
    fetchLogo();
  }, [setLogoPicture]);

  // Use blob URL if available, fallback to local file
  // ?v=version busts browser cache when logo changes
  const baseUrl = logoUrl || "/assets/logo.png";
  const imageSrc = `${baseUrl}?v=${logoPictureVersion}`;

  return (
    <div className="relative grid place-items-center">
      <div className="w-screen h-[50vh] overflow-none" />{" "}
      {/* Spacer to reserve space */}
      {/*<RotatingThreeJSModel />*/}
      <Image
        src={imageSrc}
        alt="Logo Image"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
    </div>
  );
}
