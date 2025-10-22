import type { Metadata } from "next";

import { SilverHeader } from "@/components/silver-lining/layout/silver-header";
import { SilverFooter } from "@/components/silver-lining/layout/silver-footer";

export const metadata: Metadata = {
  title: "Silver Lining Cleaning Services",
  description:
    "Premium residential and commercial cleaning with eco-friendly supplies, trained specialists, and 48-hour happiness guarantees."
};

export default function SilverMarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[hsl(var(--background))]">
      <SilverHeader />
      <main className="flex-1 pt-24 md:pt-28">{children}</main>
      <SilverFooter />
    </div>
  );
}
