import { LandingNav } from '@/components/landing/LandingNav';
import { LandingBadgeStrip } from '@/components/landing/LandingBadgeStrip';
import { HeroSection } from '@/components/landing/HeroSection';
import { SocialProofStrip } from '@/components/landing/SocialProofStrip';
import { ProductShowcase } from '@/components/landing/ProductShowcase';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { PricingSection } from '@/components/landing/PricingSection';
import { LandingCTA } from '@/components/landing/LandingCTA';
import { LandingFooter } from '@/components/landing/LandingFooter';

export function LandingPage() {
  function scrollToProduct() {
    document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="landing-page text-foreground">
      <LandingNav />
      <main>
        <HeroSection onScrollToProduct={scrollToProduct} />
        <LandingBadgeStrip />
        <SocialProofStrip />
        <ProductShowcase />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <LandingCTA />
      </main>
      <LandingFooter />
    </div>
  );
}
