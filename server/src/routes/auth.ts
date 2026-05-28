import express, { Request, Response } from "express";
import { signUpValidation } from "../utils/validation.js";
import validator from "validator";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { safeUser } from "../utils/common.js";

const router = express.Router();

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { userName, password, emailId } = req.body;
    const normalizedPassword = password.trim();
    const normalizedEmailId = emailId.trim().toLowerCase();
    const normalizedUserName = userName.trim();
    signUpValidation({
      userName: normalizedUserName,
      password: normalizedPassword,
      emailId: normalizedEmailId,
    });

    const hashPass = await bcrypt.hash(normalizedPassword, 10);

    const user = new User({
      userName: normalizedUserName,
      password: hashPass,
      emailId: normalizedEmailId,
    });

    const signUpUser = await user.save();

    const token = await signUpUser.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    req.user = signUpUser;
    res.status(200).json({ success: true, data: safeUser(signUpUser) });
  } catch (error) {
    res.status(400).json({ success: false, message: (error as Error).message });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { emailId, password } = req.body;
    const normalizedEmailId = emailId.trim().toLowerCase();
    const normalizedPassword = password.trim();
    if (
      !normalizedEmailId ||
      !validator.isEmail(normalizedEmailId) ||
      normalizedPassword.length < 8 ||
      !validator.isStrongPassword(normalizedPassword, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    )
      return res
        .status(400)
        .json({ success: false, message: "Credentials are invalid!" });

    const loggedUser = await User.findOne({ emailId: normalizedEmailId });
    if (!loggedUser)
      return res
        .status(400)
        .json({ success: false, message: "Credentials are invalid!" });

    const isPassValid = await bcrypt.compare(
      normalizedPassword,
      loggedUser.password,
    );

    if (!isPassValid)
      return res
        .status(400)
        .json({ success: false, message: "Credentials are invalid!" });

    const token = await loggedUser.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
    req.user = loggedUser;
    res.json({ success: true, data: safeUser(loggedUser) });
  } catch (error) {
    res.json({ success: false, message: (error as Error).message });
  }
});

router.post("/logout", (req: Request, res: Response) => {
  try {
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.json({ success: true, message: "Logout successful." });
  } catch (error) {
    res.json({ success: false, message: (error as Error).message });
  }
});

export default router;
