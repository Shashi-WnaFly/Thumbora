import type { ReactHTMLElement } from "react";

export interface INavLink {
  name: string;
  to: string;
}

export interface NavbarProps {
  navLinks: INavLink[];
}

export interface IFeature {
  title: string;
  icon: string;
  description: string;
}

export interface SectionTitleProps {
  text1: string;
  text2: string;
  text3: string;
}

export interface ITestimonial {
  name: string;
  image: string;
  handle: string;
  date: string;
  quote: string;
}

export interface TestimonialCardProps {
  testimonial: ITestimonial;
  index: number;
}