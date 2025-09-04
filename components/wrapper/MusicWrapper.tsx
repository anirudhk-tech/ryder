"use client";

import { useUiStore } from "@/lib/store/useUiStore";
import { useEffect } from "react";

export const MusicWrapper = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const { isLandingStarted } = useUiStore();
  useEffect(() => {
    if (!isLandingStarted) return;

    const audio = new Audio("/Website.m4a");
    audio.play().catch((err) => {
      console.error("Autoplay blocked:", err);
    });
  }, [isLandingStarted]);

  return <>{children}</>;
};
