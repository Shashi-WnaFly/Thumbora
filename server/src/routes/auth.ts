import express, { Request, Response } from "express";
import { signUpValidation } from "../utils/validation.js";
import User from "../models/User.js";
const router = express.Router();
import bcrypt from "bcrypt";

router.post("/signup", async (req: Request, res: Response) => {
  try {
    let { userName, password, emailId } = req.body;
    signUpValidation(req);
    password = password.trim();

    if(password.length > 20)
      throw new Error("Password is Invalid!");

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

export default router;
