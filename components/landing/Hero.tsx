"use client";

import { useUiStore } from "@/lib/store/useUiStore";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const { logoUrl, logoPictureVersion, setLogoPicture } = useUiStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const fetchLogo = async () => {
      const res = await fetch("/api/assets/logo", { cache: "no-store" });
      const data = await res.json();
      setLogoPicture(data.version, data.url);
      setIsReady(true);
    };
    fetchLogo();
  }, [setLogoPicture]);

  // Use blob URL if available, fallback to local file
  // ?v=version busts browser cache when logo changes
  const baseUrl = logoUrl || "/assets/logo.png";
  const imageSrc = `${baseUrl}?v=${logoPictureVersion}`;

  return (
    <div className="relative w-screen h-[50vh]">
      {/*<RotatingThreeJSModel />*/}
      {isReady && (
        <Image
          src={imageSrc}
          alt="Logo Image"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
      )}
    </div>
  );
}
