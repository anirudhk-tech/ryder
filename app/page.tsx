// app/page.tsx
"use client";

import Hero from "@/components/landing/Hero";
import MenuItem from "@/components/landing/MenuItem";
import Footer from "@/components/landing/Footer";
import { useStartLanding } from "@/lib/hooks/useStartLanding";
import { StartButton } from "@/components/landing/StartButton";
import { motion } from "framer-motion";
import { BookDialog } from "@/components/bookings/BookingDialog";
import { useUiStore } from "@/lib/store/useUiStore";

export default function HomePage() {
  const { isLandingStarted, startLanding } = useStartLanding();
  const { openHaircutBooking, openBeardBooking, openHaircutAndBeardBooking } =
    useUiStore();

  return (
    <main
      className="bg-[#fdfdfd] max-h-screen gap-6 flex flex-col items-center justify-center"
      role="main"
    >
      {isLandingStarted ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="flex flex-col gap-6 items-center px-[clamp(10px,3vw,28px)] text-center"
          >
            <Hero />

            <BookDialog />

            <ul className="flex flex-col items-center gap-[clamp(8px,2.6vh,16px)] m-0 p-0 list-none">
              <MenuItem onClick={openHaircutBooking} label="Haircut" />
              <MenuItem onClick={openBeardBooking} label="Beard" />
              <MenuItem
                onClick={openHaircutAndBeardBooking}
                label="Haircut + Beard"
              />
              <MenuItem onClick={() => {}} label="Ryder's Work" />
            </ul>
          </motion.div>
          <Footer />
        </>
      ) : (
        <StartButton onClick={startLanding} />
      )}
    </main>
  );
}
