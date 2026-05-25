import express, { Request, Response } from "express";
import User from "../models/User.js";
import { PASSWORD_RESET_TEMPLATE } from "../utils/constants.js";
import emailTransporter from "../config/emailTransporter.js";
const crypto = await import("crypto");

const router = express.Router();

router.post("/verify/reset/email", async (req: Request, res: Response) => {
  try {
    const { emailId } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Credentials are invalid!" });
    const otp = crypto.randomInt(100001, 999999).toString();
    user.verifyOtp = otp;
    user.otpExpireAt = new Date(Date.now() + 10 * 60 * 1000);

    const emailTemplate = PASSWORD_RESET_TEMPLATE.replace(
      "{{otp}}",
      otp,
    ).replace("{{email}}", emailId);
    const sub = "Thumbora Password Reset OTP";
    const options = {
      to: emailId,
      from: process.env.SENDER_EMAIL,
      subject: sub,
      html: emailTemplate,
    };

    await emailTransporter.sendMail(options);
    await user.save();

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
