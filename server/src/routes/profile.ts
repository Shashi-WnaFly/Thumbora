import express, { Request, Response } from "express";
import { userAuth } from "../middleware/auth.js";
import { ISafeUser, IUser } from "../types/types.js";

const router = express.Router();

const safeUser = (user: IUser): ISafeUser =>
  ({
    userName: user.userName,
    emailId: user.emailId,
    age: user.age,
    gender: user.gender,
    isVerified: user.isVerified,
    avatarUrl: user.avatarUrl,
  }) as ISafeUser;

router.get("/profile/view", userAuth, (req: Request, res: Response) => {
  try {
    res.json({ success: true, data: safeUser(req.user) });
  } catch (error) {
    res.status(401).json({ success: false, message: (error as Error).message });
  }
});

export default router;
