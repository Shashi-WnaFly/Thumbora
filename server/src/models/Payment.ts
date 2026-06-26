import mongoose from "mongoose";
import { IPayment } from "../types/types.js";
import validator from "validator";

const PaymentSchema = new mongoose.Schema<IPayment>({
  userId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
  },
  receipt: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  notes: {
    userName: {
      type: String,
    },
    emailId: {
      type: String,
      validate: (value: string) => {
        if (value && !validator.isEmail(value))
          throw new Error("Email is invalid!");
      },
    },
    subscriptionType: {
      type: String,
    },
  },
});

const Payment =
  mongoose.models.Payment || mongoose.model<IPayment>("Payment", PaymentSchema);

export default Payment;
