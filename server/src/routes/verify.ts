import express, { Request, Response } from "express";
import User from "../models/User.js";
const Crypto = await import("crypto");

const router = express.Router();

router.post("/verify/reset/email", async (req: Request, res: Response) => {
  try {
    const { emailId } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Credentials are invalid!" });
    const otp = Crypto.randomInt(100001, 999999).toString();
    user.verifyOtp = otp;
    user.otpExpireAt = new Date(Date.now() + 10 * 60 * 1000);

    // TODO: Send OTP to user's email using a mail service like nodemailer
    user.save();
    res.status(200).json({
      success: true,
      message: "OTP has been sent to your email for verification.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while verifying the email.",
    });
  }
});

export default router;
