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
}));
