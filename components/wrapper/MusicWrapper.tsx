"use client";

import { useUiStore } from "@/lib/store/useUiStore";
import { useEffect } from "react";

export const MusicWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { setAudio, isLandingStarted } = useUiStore();

  useEffect(() => {
    if (!isLandingStarted) return;

    const playAudio = async () => {
      const res = await fetch("/api/assets/audio", { cache: "no-store" });
      const data = await res.json();
      setAudio(data.version, data.url);

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
