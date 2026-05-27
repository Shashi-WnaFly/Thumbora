import express, { Request, Response } from "express";
import User from "../models/User.js";
import { PASSWORD_RESET_TEMPLATE } from "../utils/constants.js";
import emailTransporter from "../config/emailTransporter.js";
import { randomInt, createHash, timingSafeEqual } from "crypto";
import validator from "validator";

const router = express.Router();

router.post("/verify/email/reset", async (req: Request, res: Response) => {
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
      return res.status(200).json({
        success: true,
        message: "OTP already sent. Please wait before requesting again.",
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

router.post("/verify/otp/reset", async (req: Request, res: Response) => {
  try {
    const { emailId, otp } = req.body;

    if (!emailId || !validator.isEmail(emailId.trim().toLowerCase()))
      return res.status(401).json({
        success: false,
        message: "Valid email is required!",
      });

    if (!otp || otp.length !== 6 || !validator.isNumeric(otp))
      return res.status(401).json({
        success: false,
        message: "Valid OTP is required!",
      });

    const normalizedEmail = emailId.trim().toLowerCase();

    const user = await User.findOne({ emailId: normalizedEmail });

    if (!user || !user.verifyOtp || !user.otpExpireAt)
      return res.status(401).json({
        success: false,
        message: "Invalid OTP or email!",
      });

    user.otpAttempts += 1;

    if (user.otpExpireAt < new Date()) {
      user.verifyOtp = null;
      user.otpExpireAt = null;
      user.otpAttempts = 0;
      await user.save();

      return res.status(401).json({
        success: false,
        message: "OTP has expired!",
      });
    }

    if (user.otpAttempts > 5) {
      user.verifyOtp = null;
      user.otpExpireAt = null;
      user.otpAttempts = 0;
      await user.save();

      return res.status(429).json({
        success: false,
        message: "Too many attempts! Please request a new OTP.",
      });
    }

    const hashedOTP = createHash("sha256").update(otp).digest("hex");

    if (!timingSafeEqual(Buffer.from(hashedOTP), Buffer.from(user.verifyOtp))) {
      return res.status(401).json({
        success: false,
        message: "Invalid OTP! try again.",
      });
    }

    user.verifyOtp = null;
    user.otpExpireAt = null;
    user.otpAttempts = 0;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully! you can now reset your password.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export default router;
