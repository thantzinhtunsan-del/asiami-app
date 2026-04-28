import HeroSection from '@/components/home/HeroSection';
import CategoryGrid from '@/components/ui/CategoryGrid';
import FeaturedSellers from '@/components/home/FeaturedSellers';
import HowItWorks from '@/components/home/HowItWorks';
import TrustSection from '@/components/home/TrustSection';

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <CategoryGrid />
      <FeaturedSellers />
      <HowItWorks />
      <TrustSection />
    </div>
  );
}
