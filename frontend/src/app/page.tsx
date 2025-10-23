import { HeroBanner } from "@/components/hero/hero-banner";
import { MainNav } from "@/components/navigation/main-nav";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { MetricsSection } from "@/components/sections/metrics-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ServicesSection } from "@/components/sections/services-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { TestimonialsSection } from "@/components/sections/testimonials-section";

export default function HomePage() {
  return (
    <>
      <MainNav />
      <main>
        <HeroBanner />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <MetricsSection />
        <GallerySection />
        <TestimonialsSection />
        <ContactSection />
        <SiteFooter />
      </main>
    </>
  );
}
