"use client";

import { useUiStore } from "@/lib/store/useUiStore";
import { useEffect } from "react";

export const MusicWrapper = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const { setAudio, isLandingStarted } = useUiStore();

  useEffect(() => {
    if (!isLandingStarted) return;

    const playAudio = async () => {
      const res = await fetch("/api/assets/audio", { cache: "no-store" });
      const data = await res.json();
      setAudio(data.version, data.url);

      // Use blob URL if available, fallback to local file
      // ?v=version busts browser cache when audio changes
      const baseUrl = data.url || "/assets/Website.m4a";
      const audioSrc = `${baseUrl}?v=${data.version}`;
      const audio = new Audio(audioSrc);
      audio.loop = true;
      audio.play().catch((err) => {
        console.error("Autoplay blocked:", err);
      });
    };

    playAudio();
  }, [isLandingStarted, setAudio]);

  return <>{children}</>;
};
