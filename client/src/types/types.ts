import type { IThumbnail } from "../data/dataAssets";

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

export interface IPricing {
  name: string;
  price: number;
  period: string;
  features: string[];
  mostPopular: boolean;
}

export interface ILink {
  name: string;
  href: string;
}

export interface IFooter {
  title: string;
  links: ILink[];
}

export interface IStore {
  user: object;
  toast: IToast[];
  thumbnailList: IThumbnail[];
}

export interface IToast {
  id?: number;
  type: string;
  message: string;
  timeout?: ReturnType<typeof setTimeout>;
}

export interface paymentOrder {
  orderId: string;
  currency: string;
  notes: INotes;
  amount: number;
}

export interface INotes {
  userName: string;
  emailId: string;
  subscriptionType: string;
}

export interface apiResponse {
  success: boolean;
  data?: object;
  message: string;
  resetToken?: string;
  RZYKey?: string;
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id: string;
  notes?: INotes;
  theme?: {
    color: string;
  };
}

export interface RazorpayInstance {
  open(): void;
}
