import type { RazorpayInstance, RazorpayOptions } from "./types";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}
