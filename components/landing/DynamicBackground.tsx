"use client";

import { useUiStore, BackgroundConfig } from "@/lib/store/useUiStore";
import { useEffect, useState } from "react";
import Image from "next/image";

export function DynamicBackground() {
  const { background, setBackground } = useUiStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const fetchBackground = async () => {
      try {
        const res = await fetch("/api/assets/background", { cache: "no-store" });
        const data = await res.json();
        if (data.background) {
          setBackground(data.version, data.background as BackgroundConfig);
        }
      } catch {
        // Use default background on error
      }
      setIsReady(true);
    };
    fetchBackground();
  }, [setBackground]);

  if (!isReady) {
    // Return black background while loading to prevent flash
    return (
      <div className="absolute inset-0 z-0 bg-black" aria-hidden="true" />
    );
  }

  // Color background
  if (background.type === "color") {
    return (
      <div
        className="absolute inset-0 z-0"
        style={{ backgroundColor: background.value }}
        aria-hidden="true"
      />
    );
  }

  // Image background
  if (background.type === "image") {
    return (
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Image
          src={background.value}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>
    );
  }

  // Video background
  if (background.type === "video") {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute min-w-full min-h-full w-auto h-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover"
        >
          <source src={background.value} />
        </video>
      </div>
    );
  }

  return null;
}
