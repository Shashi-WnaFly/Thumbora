import React from "react";
import HeroSection from "../sections/HeroSection";
import TestimonialSection from "../sections/TestimonialSection";
import PricingSection from "../sections/PricingSection";
import Feature from "../sections/Feature";

function HomePage() {
  return (
    <>
      <HeroSection />
      <Feature />
      <TestimonialSection />
      <PricingSection />
    </>
  );
}

export default HomePage;
