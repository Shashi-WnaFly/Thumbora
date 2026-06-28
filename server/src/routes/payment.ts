import express, { Request, Response } from "express";
import { userAuth } from "../middleware/auth.js";
import instance from "../config/razorpay.js";
import { subscriptionAmount } from "../utils/constants.js";
import { IsubscriptionType } from "../types/types.js";
import Payment from "../models/Payment.js";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils.js";
import User from "../models/User.js";
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
        RZYKey: process.env.RAZORPAY_KEY_ID,
        message: "Order has created successfully.",
      });
    } catch (error) {
      res.json({ success: false, message: (error as Error).message });
    }
  },
);

router.post("/payment/webhook", async (req: Request, res: Response) => {
  try {
    const webhookSignature = req.get("X-Razorpay-Signature");

    const isSignatureValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature as string,
      process.env.RAZORPAY_WEBHOOK_SECRET as string,
    );

    if (!isSignatureValid)
      return res
        .status(401)
        .json({ success: false, message: "webhook signature is invalid!" });

    const paymentDetails = req.body.payload.payment.entity;

    const payment = await Payment.findOne({ orderId: paymentDetails.order_id });

    payment.status = paymentDetails.status;
    payment.paymentId = paymentDetails.id;
    await payment.save();

    if (req.body.event === "payment.captured") {
      const user = await User.findById(payment.userId);

      if (!user)
        return res
          .status(401)
          .json({ success: false, message: "user not found!!" });

      user.subscriptionType = payment.subscriptionType;
      user.isPremium = true;
      await user.save();
    }

    res
      .status(200)
      .json({ success: true, message: "webhook received successfully." });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ success: false, message: "Interval server error." });
  }
});

export default router;
