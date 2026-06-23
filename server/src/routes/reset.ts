import express, { Request, Response } from "express";
import User from "../models/User.js";
import { PASSWORD_RESET_TEMPLATE } from "../utils/constants.js";
import emailTransporter from "../config/emailTransporter.js";
import crypto from "crypto";
import validator from "validator";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/reset/verify/email", async (req: Request, res: Response) => {
  try {
    // TODO: implement rate limiting using redis
    const { emailId } = req.body;
    const normalizedEmail = emailId ? emailId.trim().toLowerCase() : null;

    if (!normalizedEmail || !validator.isEmail(normalizedEmail))
      return res
        .status(400)
        .json({ success: false, message: "Valid email is required!" });

    const user = await User.findOne({ emailId: normalizedEmail });

    if (!user)
      return res.status(200).json({
        success: false,
        message: "If the email exists, OTP has been sent.",
      });

    if (
      user.otpExpireAt &&
      user.otpExpireAt > new Date(Date.now() + 8 * 60 * 1000) // 2 minutes cool down period.
    )
      return res.status(429).json({
        success: false,
        message: "Please wait 2 minute before requesting another OTP.",
      });

    const otp = crypto.randomInt(100000, 999999).toString();
    user.verifyOtp = crypto.createHash("sha256").update(otp).digest("hex"); // creating OTP hash
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

    await emailTransporter.sendMail(options);
    await user.save();

    res.status(200).json({
      success: true,
      message: "OTP has been sent.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

router.post("/reset/verify/otp", async (req: Request, res: Response) => {
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

    if (user.otpAttempts > 3) {
      user.verifyOtp = null;
      user.otpExpireAt = null;
      user.otpAttempts = 0;
      await user.save();

      return res.status(429).json({
        success: false,
        message: "Too many attempts! Please request a new OTP.",
      });
    }

    const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

    if (
      !crypto.timingSafeEqual(
        Buffer.from(hashedOTP),
        Buffer.from(user.verifyOtp),
      )
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid OTP! try again.",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.verifyOtp = null;
    user.resetPasswordExpireAt = new Date(Date.now() + 10 * 60 * 1000);
    user.otpAttempts = 0;
    await user.save();

    res.status(200).json({
      success: true,
      message: "OTP verified successfully! you can now reset your password.",
      resetToken: resetToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

router.post("/reset/update/password", async (req: Request, res: Response) => {
  try {
    const { resetToken, newPassword, confirmPassword } = req.body;

    if (!resetToken || !newPassword || !confirmPassword)
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });

    if (
      newPassword.length < 8 ||
      newPassword.length > 20 ||
      !validator.isStrongPassword(newPassword, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    )
      return res.status(400).json({
        success: false,
        message:
          "Password must be 8-20 size contain uppercase, lowercase, number and symbol!",
      });

    if (newPassword !== confirmPassword)
      return res.status(400).json({
        success: false,
        message: "Passwords do not match!",
      });

    const hashedResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedResetToken,
      resetPasswordExpireAt: { $gt: new Date() },
    });

    if (!user)
      return res.status(401).json({
        success: false,
        message: "Invalid or expired reset token!",
      });

    const isSamePassword = await bcrypt.compare(newPassword, user.password);

    if (isSamePassword)
      return res.status(400).json({
        success: false,
        message: "New password cannot be the same as the old password!",
      });

    user.resetPasswordToken = null;
    user.resetPasswordExpireAt = null;
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully!",
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
