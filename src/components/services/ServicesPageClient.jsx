"use client";

import LenisSmoothScroll from "@/components/LenisSmoothScroll";
import Footer from "@/components/Footer";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesShowcase from "@/components/services/ServicesShowcase";
import ProcessStrip from "@/components/services/ProcessStrip";
import FAQSection from "@/components/FAQSection";
import ServicesCTA from "@/components/services/ServicesCTA";

export default function ServicesPageClient() {
  return (
    <LenisSmoothScroll>
      <main className="services-page">
        <ServicesHero />
        <ServicesShowcase />
        <ServicesCTA />
        <ProcessStrip />
        <FAQSection variant="services" />
      </main>
      <Footer />
    </LenisSmoothScroll>
  );
}
