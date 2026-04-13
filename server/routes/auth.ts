import express, { Request, Response } from "express";
import { signUpValidation } from "../utils/validation";
const router = express.Router();

router.post("/signup", (req: Request, res: Response) => {
  try {
    let { userName, password, emailId } = req.body;
    signUpValidation(req);
    userName = userName.trim();
    emailId = emailId.trim();
    password = password.trim();

    

    res.status(200).json({ message: "User signed up successfully!" });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

export default router;
