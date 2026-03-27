import SectionTitle from "../components/SectionTitle";
import { testimonialsData } from "../data/testimonial";
import TestimonialCard from "../components/TestimonialCard";
import type { ITestimonial } from "../types";

export default function TestimonialSection() {
  return (
    <div className="mt-16 px-4 md:px-16 lg:px-24 xl:px-32 ">
      <SectionTitle
        text1="Testimonials"
        text2="Don't just take our words"
        text3="Hear what our users say about us. We're always looking for ways to improve. If you have a positive experience with us, leave a review."
      />
      <div className=" relative after:content-[''] after:absolute after:w-3/12 after:h-full after:top-0 after:left-0 after:bg-linear-to-r after:from-black after:to-transparent before:content-[''] before:absolute before:w-3/12 before:h-full before:top-0 before:right-0 before:bg-linear-to-l before:from-black before:to-transparent before:z-10">
        <div className="mt-12 mx-auto flex max-w-5xl overflow-x-auto no-scrollbar">
          <div className=" flex infinite-scroll-right items-center justify-center py-4 gap-2 pr-2">
            {testimonialsData.map((testimonial: ITestimonial, index: number) => (
              <TestimonialCard
                key={`right-1-${index}`}
                {...testimonial}
              />
            ))}
          </div>
          <div
            className="  flex infinite-scroll-right items-center justify-center py-4 gap-2 pr-2"
          >
            {testimonialsData.map((testimonial: ITestimonial, index: number) => (
              <TestimonialCard
                key={`right-2-${index}`}
                {...testimonial}
              />
            ))}
          </div>
        </div>
        <div className=" mx-auto flex max-w-5xl overflow-x-auto no-scrollbar">
          <div className=" flex infinite-scroll-left items-center justify-center py-4 gap-2 pl-2">
            {testimonialsData.map((testimonial: ITestimonial, index: number) => (
              <TestimonialCard
                key={`left-1-${index}`}
                {...testimonial}
              />
            ))}
          </div>
          <div
            className=" flex infinite-scroll-left items-center justify-center py-4 gap-2 pl-2"
          >
            {testimonialsData.map((testimonial: ITestimonial, index: number) => (
              <TestimonialCard
                key={`left-2-${index}`}
                {...testimonial}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
