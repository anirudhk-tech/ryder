import { useUiStore } from "@/lib/store/useUiStore";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useState } from "react";

export const BookDialog = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const {
    isHaircutBookingOpen,
    isBeardBookingOpen,
    isHaircutAndBeardBookingOpen,
    closeHaircutBooking,
    closeBeardBooking,
    closeHaircutAndBeardBooking,
  } = useUiStore();
  const isOpen =
    isHaircutBookingOpen || isBeardBookingOpen || isHaircutAndBeardBookingOpen;

  const getEmbedUrl = () => {
    if (isHaircutBookingOpen)
      return "https://koalendar.com/e/get-cut-by-ryder?month=2025-12&duration=60&services=UYDCJ&date=2025-12-15";
    if (isBeardBookingOpen)
      return "https://koalendar.com/e/get-cut-by-ryder?month=2025-12&duration=30&services=QMNBM&date=2025-12-15";
    if (isHaircutAndBeardBookingOpen)
      return "https://koalendar.com/e/get-cut-by-ryder?month=2025-12&duration=80&services=59NAW&date=2025-12-15";
  };

  const onClose = () => {
    setIframeLoaded(false);
    if (isHaircutBookingOpen) closeHaircutBooking();
    if (isBeardBookingOpen) closeBeardBooking();
    if (isHaircutAndBeardBookingOpen) closeHaircutAndBeardBooking();
  };

  if (!isOpen) return null;

  return (
    <motion.div className="fixed inset-0 w-full h-[100dvh] z-[10000]">
      {iframeLoaded ? (
        <Button
          onClick={onClose}
          className="absolute bg-[#445367] text-white top-4 left-4 z-50 rounded-sm cursor-pointer"
          size={"sm"}
        >
          Close
        </Button>
      ) : null}
      <iframe
        src={getEmbedUrl()}
        onLoad={() => setIframeLoaded(true)}
        className="w-full h-full border-0"
      />
    </motion.div>
  );
};
