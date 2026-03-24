import React from "react";
import HeroSection from "../sections/HeroSection";
import TestimonialSection from "../sections/TestimonialSection";
import PricingSection from "../sections/PricingSection";
import FeaturesSection from "../sections/FeaturesSection";

function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <TestimonialSection />
      <PricingSection />
    </>
  );
}

export default HomePage;
