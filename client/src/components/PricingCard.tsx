import type { apiResponse, IPricing, paymentOrder } from "../types";
import { CheckIcon } from "lucide-react";
import api from "../configs/api";

const PricingCard = ({
  name,
  price,
  period,
  features,
  mostPopular,
}: IPricing) => {
  const handlePayment = async () => {
    try {
      const order = await api.post("/payment/create/order", {
        subscriptionType: name,
      });

      const data: apiResponse = order.data;

      if (!order || !order.data) throw new Error("Something went wrong.");

      const { orderId, currency, notes, amount } = data.data as paymentOrder;

      const options = {
        key: data.RZYKey,
        amount,
        currency,
        name: "Thumbora",
        description: "Test Transaction",
        image: "/favicon.svg",
        order_id: orderId,
        notes,
        theme: {
          color: "#FF6A1C",
        },
      };

      const rzy1 = new window.Razorpay(options);
      rzy1.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`w-72 text-center border border-orange-950 p-6 pb-16 rounded-xl ${mostPopular ? "bg-orange-950 relative" : "bg-orange-950/30"}`}
    >
      {mostPopular && (
        <p className="absolute px-3 text-sm -top-3.5 left-3.5 py-1 bg-orange-400 rounded-full">
          Most Popular
        </p>
      )}
      <p className="font-semibold">{name}</p>
      <h1 className="text-3xl font-semibold">
        {price}₹
        <span className="text-gray-500 font-normal text-sm">/{period}</span>
      </h1>
      <ul className="list-none text-slate-300 mt-6 space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <CheckIcon className="size-4.5 text-orange-600" />
            <p>{feature}</p>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={handlePayment}
        className={`w-full py-2.5 rounded-md font-medium mt-7 transition-all ${mostPopular ? "bg-white text-orange-600 hover:bg-slate-200" : "bg-orange-500 hover:bg-orange-600"}`}
      >
        Get Started
      </button>
    </div>
  );
};

export default PricingCard;
