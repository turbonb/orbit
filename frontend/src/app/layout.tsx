import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { GlobalVideoBackground } from "@/components/layout/global-video-background";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const gamePaused = localFont({
  src: "../../public/fonts/game-paused.otf",
  variable: "--font-game-paused",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Silver Lining Cleaning Services",
  description:
    "Silver Lining delivers premium residential and commercial cleaning with eco-friendly products, meticulous teams, and concierge-level care."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${gamePaused.variable} font-sans antialiased`}>
        <GlobalVideoBackground />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
