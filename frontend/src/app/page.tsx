import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CTASection } from "@/components/sections/cta";
import { FounderSection } from "@/components/sections/founder";
import { HeroSection } from "@/components/sections/hero";
import { ProcessSection } from "@/components/sections/process";
import { ServicesSection } from "@/components/sections/services";
import { WhyChooseUsSection } from "@/components/sections/why-choose-us";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden pt-[5.5rem]">
      <SiteHeader />
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <WhyChooseUsSection />
      <FounderSection />
      <CTASection />
      <SiteFooter />
    </main>
  );
}
