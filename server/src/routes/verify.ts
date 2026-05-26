import express, { Request, Response } from "express";
import User from "../models/User.js";
import { PASSWORD_RESET_TEMPLATE } from "../utils/constants.js";
import emailTransporter from "../config/emailTransporter.js";
import { randomInt, createHash } from "crypto";
import validator from "validator";

const router = express.Router();

router.post("/verify/reset/email", async (req: Request, res: Response) => {
  try {
    // TODO: implement rate limiting using redis
    const { emailId } = req.body;
    const normalizedEmail = emailId.trim().toLowerCase();

    if (!normalizedEmail || !validator.isEmail(normalizedEmail))
      return res
        .status(400)
        .json({ success: false, message: "Valid email is required!" });

    const user = await User.findOne({ emailId: normalizedEmail });

    res.status(200).json({
      success: true,
      message: "If the email exists, OTP has been sent.",
    });

    if (!user) return;

    if (
      user.otpExpireAt &&
      user.otpExpireAt > new Date(Date.now() - 2 * 60 * 1000)
    )
      res.status(200).json({
        success: true,
        message: "",
      });

    const otp = randomInt(100000, 1000000).toString();
    user.verifyOtp = createHash("sha256").update(otp).digest("hex"); // creating OTP hash
    user.otpExpireAt = new Date(Date.now() + 10 * 60 * 1000);

    const emailTemplate = PASSWORD_RESET_TEMPLATE.replace(
      "{{otp}}",
      otp,
    ).replace("{{email}}", normalizedEmail);

    const sub = "Thumbora Password Reset OTP";
    const options = {
      to: normalizedEmail,
      from: process.env.SENDER_EMAIL,
      subject: sub,
      html: emailTemplate,
    };

    await user.save();
    await emailTransporter.sendMail(options);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export default router;
