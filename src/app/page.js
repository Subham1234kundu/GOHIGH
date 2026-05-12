import ThreeHero from "@/components/ThreeHero";
import ImpactSection from "@/components/ImpactSection";
import ProcessSection from "@/components/ProcessSection";
import ServicesSection from "@/components/ServicesSection";
import OurWorkSection from "@/components/OurWorkSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <main>
      <ThreeHero />
      <ImpactSection />
      <ProcessSection />
      <ServicesSection />
      <OurWorkSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
