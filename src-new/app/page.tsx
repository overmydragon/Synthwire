import { Hero } from '@/components/landing/Hero';
import { ProofMetrics } from '@/components/landing/ProofMetrics';
import { Features } from '@/components/landing/Features';
import { ProductWalkthrough } from '@/components/landing/ProductWalkthrough';
import { Pricing } from '@/components/landing/Pricing';
import { FAQ } from '@/components/landing/FAQ';
import { CTA } from '@/components/landing/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <ProofMetrics />
      <Features />
      <ProductWalkthrough />
      <Pricing />
      <FAQ />
      <CTA />
    </>
  );
}