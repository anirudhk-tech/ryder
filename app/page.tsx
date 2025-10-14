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
import { useRouter } from "next/navigation";
import { FloatingIcons } from "@/components/FloatingIcons";

export default function HomePage() {
  const { isLandingStarted, startLanding } = useStartLanding();
  const { openHaircutBooking, openBeardBooking, openHaircutAndBeardBooking } =
    useUiStore();
  const router = useRouter();

  return (
    <main
      className="bg-[url('/background.JPG')] bg-cover bg-center min-h-screen gap-6 flex flex-col items-center justify-center  overflow-x-hidden overflow-y-hidden"
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
              <MenuItem onClick={openHaircutBooking} label="Haircut" animate />
              <MenuItem onClick={openBeardBooking} label="Beard" animate />
              <MenuItem
                onClick={openHaircutAndBeardBooking}
                label="Haircut + Beard"
                animate
              />
              <MenuItem
                onClick={() => router.push("/work")}
                label="Ryder's Work"
                animate
              />
            </ul>
          </motion.div>
          <FloatingIcons animate />
          <Footer />
        </>
      ) : (
        <StartButton onClick={startLanding} />
      )}
    </main>
  );
}
