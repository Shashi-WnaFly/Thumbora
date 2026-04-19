import express, { Request, Response } from "express";
import { signUpValidation } from "../utils/validation.js";
import validator from "validator";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/signup", async (req: Request, res: Response) => {
  try {
    let { userName, password, emailId } = req.body;
    signUpValidation(req);
    password = password.trim();

    const hashPass = await bcrypt.hash(password, 10);

    const user = new User({ userName, password: hashPass, emailId });

    const signUpUser = await user.save();

    const token = await signUpUser.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });
    req.user = signUpUser;
    res.status(200).json({ success: true, message: "Signup successfully." });
  } catch (error) {
    res.status(400).json({ success: false, message: (error as Error).message });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { emailId, password } = req.body;
    if (
      !emailId ||
      !validator.isEmail(emailId) ||
      password.length < 8 ||
      !validator.isStrongPassword(password)
    )
      return res
        .status(400)
        .json({ success: false, message: "Credentials are Invalid!" });

    const loggedUser = await User.findOne({ emailId: emailId });
    if (!loggedUser)
      return res
        .status(400)
        .json({ success: false, message: "user not found!" });

    const isPassValid = await bcrypt.compare(password, loggedUser.password);

    if (!isPassValid)
      return res
        .status(400)
        .json({ success: false, message: "Credentials are Invalid!" });

    const token = await loggedUser.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });
    req.user = loggedUser;
    res.json({ success: true, message: "Logged in successfully." });
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
