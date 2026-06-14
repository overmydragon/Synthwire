import { Hero } from '@/components/landing/Hero';
import { SourceMarquee } from '@/components/landing/SourceMarquee';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { DemoSection } from '@/components/landing/DemoSection';
import { Comparison } from '@/components/landing/Comparison';
import { ProofMetrics } from '@/components/landing/ProofMetrics';
import { Features } from '@/components/landing/Features';
import { Pricing } from '@/components/landing/Pricing';
import { FAQ } from '@/components/landing/FAQ';
import { CTA } from '@/components/landing/CTA';
import { FooterMarquee } from '@/components/landing/FooterMarquee';
import { SideNav } from '@/components/landing/SideNav';

export default function Home() {
  return (
    <>
      <SideNav />
      <Hero />
      <SourceMarquee />
      <HowItWorks />
      <DemoSection />
      <Comparison />
      <ProofMetrics />
      <Features />
      <Pricing />
      <FAQ />
      <CTA />
      <FooterMarquee />
    </>
  );
}