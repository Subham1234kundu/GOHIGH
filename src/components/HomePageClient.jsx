"use client";

import LenisSmoothScroll from "@/components/LenisSmoothScroll";
import ThreeHero from "@/components/ThreeHero";
import ImpactSection from "@/components/ImpactSection";
import ProcessSection from "@/components/ProcessSection";
import ServicesSection from "@/components/ServicesSection";
import OurWorkSection from "@/components/OurWorkSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";

/**
 * Home page: Lenis smooth scroll for the whole document.
 * ThreeHero is unchanged — sticky + window scroll scrub still work under Lenis.
 */
export default function HomePageClient() {
  return (
    <LenisSmoothScroll>
      <main>
        <ThreeHero />
        <ImpactSection />
        <ProcessSection />
        <ServicesSection />
        <OurWorkSection />
        <FAQSection />
        <CTASection />
      </main>
    </LenisSmoothScroll>
  );
}
