import HeroSection from "../sections/HeroSection";
import TestimonialSection from "../sections/TestimonialSection";
import PricingSection from "../sections/PricingSection";
import FeaturesSection from "../sections/FeaturesSection";
import ContactSection from "../sections/ContactSection";
import CTASection from "../sections/CTASection";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <TestimonialSection />
      <PricingSection />
      <ContactSection />
      <CTASection />
      <Footer />
    </>
  );
}

export default HomePage;
