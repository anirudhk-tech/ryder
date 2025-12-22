"use client";

import { useUiStore } from "@/lib/store/useUiStore";
import { useEffect } from "react";

export const MusicWrapper = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const { audioVersion, setAudioVersion, isLandingStarted } = useUiStore();

  useEffect(() => {
    if (!isLandingStarted) return;

    const mountAudio = async () => {
      const res = await fetch("api/assets/audio");
      const data = await res.json();

      setAudioVersion(data.version);
    };

    mountAudio();

    const audio = new Audio(`assets/Website.m4a?v=${audioVersion}`);
    audio.loop = true;
    audio.play().catch((err) => {
      console.error("Autoplay blocked:", err);
    });
  }, [isLandingStarted]);

  return <>{children}</>;
};
