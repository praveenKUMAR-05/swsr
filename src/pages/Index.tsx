import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { ProductFeatures } from "@/components/ProductFeatures";
import { BenefitsSection } from "@/components/BenefitsSection";

const Index = () => {
  return (
    <div className="min-h-screen page-enter">
      <Navbar />
      <main>
        <HeroSection />
        <ProductFeatures />
        <BenefitsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
