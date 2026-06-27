import express, { Request, Response } from "express";
import { userAuth } from "../middleware/auth.js";
import instance from "../config/razorpay.js";
import { subscriptionAmount } from "../utils/constants.js";
import { IsubscriptionType } from "../types/types.js";
import Payment from "../models/Payment.js";
const router = express.Router();

router.post(
  "/payment/create/order",
  userAuth,
  async (req: Request, res: Response) => {
    try {
      const subscriptionType: IsubscriptionType = req.body.subscriptionType;
      const { userName, emailId, _id } = req.user;

      if (!subscriptionType) throw new Error("subscription plan is invalid!");

      const order = await instance.orders.create({
        amount: subscriptionAmount[subscriptionType] * 100,
        receipt: "receipt#1",
        currency: "INR",
        notes: {
          userName,
          emailId,
          subscriptionType,
        },
      });

      const { id, amount, status, currency, notes, receipt } = order;

      const newPayment = new Payment({
        userId: _id,
        orderId: id,
        amount,
        currency,
        receipt,
        status,
        notes,
      });

      const paymentDetails = await newPayment.save();

      res.json({
        success: true,
        data: paymentDetails.toJSON(),
        RZYkey: process.env.RAZORPAY_KEY_ID,
        message: "Order has created successfully.",
      });
    } catch (error) {
      res.json({ success: false, message: (error as Error).message });
    }
  },
);

export default router;
