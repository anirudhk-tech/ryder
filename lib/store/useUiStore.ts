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
  setLogoPictureVersion: (version: number) => void;
  audioVersion: number;
  setAudioVersion: (version: number) => void;
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
  setLogoPictureVersion: (version: number) =>
    set({ logoPictureVersion: version }),
  audioVersion: 1,
  setAudioVersion: (version: number) => set({ audioVersion: version }),
  reviewsVersion: 1,
  setReviewsVersion: (version: number) => set({ reviewsVersion: version }),
}));
