import type { Metadata } from "next";
import "./globals.css";
import { Press_Start_2P, Silkscreen } from "next/font/google";
import { MusicWrapper } from "@/components/wrapper/MusicWrapper";

const press = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-press",
  display: "swap",
});

const pixel = Silkscreen({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-pixel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ryder",
  description: "Ryder's Barbershop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <MusicWrapper>
        <body className={`${press.variable} ${pixel.variable}`}>
          {children}
        </body>
      </MusicWrapper>
    </html>
  );
}
