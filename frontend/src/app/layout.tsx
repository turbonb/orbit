import type { Metadata } from "next";
import { Fahkwang } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";

const fahkwang = Fahkwang({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-fahkwang",
  display: "swap"
});

const gamePaused = localFont({
  src: "../../public/fonts/game-paused.otf",
  variable: "--font-game-paused",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Orbit — Launch Studio",
  description:
    "Orbit is the launch sprint program crafting design-forward Supabase web experiences at remarkable speed."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fahkwang.variable} ${gamePaused.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
