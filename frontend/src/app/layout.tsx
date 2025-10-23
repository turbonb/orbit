import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flashpoint Energy | Woodland",
  description:
    "Port of the Flashpoint Energy V2 Webflow experience for Nick's Main Site.",
  metadataBase: new URL("https://nicks-main-site.webflow.io/")
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
