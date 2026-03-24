import React from "react";
import type { TestimonialCardProps } from "../types";

export default function TestimonialCard({
  testimonial,
  index,
}: TestimonialCardProps) {
  return (
    <div className="p-4 max-w-2xl flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <img src={testimonial.image} alt={testimonial.name} />
        <div>
          <p>
            {testimonial.name} <span>{testimonial.handle}</span>
          </p>
        </div>
      </div>
      <p>{testimonial.quote}</p>
    </div>
  );
}
