import { HeroSection } from "./HeroSection";
import { ProductCategoriesGrid } from "./ProductCategoriesGrid";
import { ValuePackSection } from "./ValuePackSection";
import { BestSellersSection } from "./BestSellersSection";
import { TrustPillars } from "./TrustPillars";
import { FAQSection } from "./FAQSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductCategoriesGrid />
      <ValuePackSection />
      <BestSellersSection />
      <TrustPillars />
      <FAQSection />
    </>
  );
}
