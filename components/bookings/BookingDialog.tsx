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
    if (isHaircutBookingOpen) return "https://cal.com/anirudh-kuppili/30min";
    if (isBeardBookingOpen) return "https://cal.com/anirudh-kuppili/30min";
    if (isHaircutAndBeardBookingOpen)
      return "https://cal.com/anirudh-kuppili/30min";
  };

  const onClose = () => {
    setIframeLoaded(false);
    if (isHaircutBookingOpen) closeHaircutBooking();
    if (isBeardBookingOpen) closeBeardBooking();
    if (isHaircutAndBeardBookingOpen) closeHaircutAndBeardBooking();
  };

  if (!isOpen) return null;

  return (
    <motion.div className="absolute w-full h-screen">
      {iframeLoaded ? (
        <Button
          onClick={onClose}
          className="absolute bg-white text-black top-4 left-4 z-50 cursor-pointer"
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
