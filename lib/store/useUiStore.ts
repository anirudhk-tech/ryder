import { create } from "zustand";

type UiState = {
  isLandingStarted: boolean;
  isHaircutBookingOpen: boolean;
  isBeardBookingOpen: boolean;
  isHaircutAndBeardBookingOpen: boolean;
  startLanding: () => void;
  openHaircutBooking: () => void;
  closeHaircutBooking: () => void;
  openBeardBooking: () => void;
  closeBeardBooking: () => void;
  openHaircutAndBeardBooking: () => void;
  closeHaircutAndBeardBooking: () => void;

  logoPictureVersion: number;
  logoUrl: string | null;
  setLogoPicture: (version: number, url: string | null) => void;
  audioVersion: number;
  audioUrl: string | null;
  setAudio: (version: number, url: string | null) => void;
  reviewsVersion: number;
  setReviewsVersion: (version: number) => void;
};

export const useUiStore = create<UiState>((set) => ({
  isLandingStarted: false,
  isHaircutBookingOpen: false,
  isBeardBookingOpen: false,
  isHaircutAndBeardBookingOpen: false,
  startLanding: () => set({ isLandingStarted: true }),
  openHaircutBooking: () => set({ isHaircutBookingOpen: true }),
  closeHaircutBooking: () => set({ isHaircutBookingOpen: false }),
  openBeardBooking: () => set({ isBeardBookingOpen: true }),
  closeBeardBooking: () => set({ isBeardBookingOpen: false }),
  openHaircutAndBeardBooking: () => set({ isHaircutAndBeardBookingOpen: true }),
  closeHaircutAndBeardBooking: () =>
    set({ isHaircutAndBeardBookingOpen: false }),

  logoPictureVersion: 1,
  logoUrl: null,
  setLogoPicture: (version: number, url: string | null) =>
    set({ logoPictureVersion: version, logoUrl: url }),
  audioVersion: 1,
  audioUrl: null,
  setAudio: (version: number, url: string | null) =>
    set({ audioVersion: version, audioUrl: url }),
  reviewsVersion: 1,
  setReviewsVersion: (version: number) => set({ reviewsVersion: version }),
}));
