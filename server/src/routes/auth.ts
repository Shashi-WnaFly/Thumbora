import express, { Request, Response } from "express";
import { signUpValidation } from "../utils/validation.js";
import validator from "validator";
import User from "../models/User.js";
const router = express.Router();
import bcrypt from "bcrypt";

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
      expires: new Date(Date.now() + 60 * 60 * 24),
    });
    res.status(200).json({ success: true, data: signUpUser });
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

    res.cookie("token", token, {expires: new Date(Date.now() + 60 * 60 * 24)});
  } catch (error) {
    res.json({ success: false, message: (error as Error).message });
  }
});

export default router;
