import React from "react";
import SectionTitle from "../components/SectionTitle";
import { pricingData } from "../data/pricing";
import type { IPricing } from "../types";
import PricingCard from "../components/PricingCard";

export default function PricingSection() {
  return (
    <div className="mt-16 flex flex-col justify-center items-center">
      <SectionTitle
        text1="Pricing"
        text2="Simple Pricing"
        text3="Choose the plan that fits your creation schedule. Cancel anytime."
      />

      <div className="flex flex-wrap justify-center items-center mt-16 gap-10">
        {pricingData.map((pricing: IPricing) => (
          <PricingCard {...pricing} />
        ))}
      </div>
    </div>
  );
}
