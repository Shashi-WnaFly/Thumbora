import express, { Request, Response } from "express";
import { userAuth } from "../middleware/auth.js";
import { ISafeUser, IUser } from "../types/types.js";
import { ALLOWED_USER_EDITS } from "../utils/constant.js";
import validator from "validator";
import bcrypt from "bcrypt";

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

router.patch("/profile/edit", userAuth, async (req: Request, res: Response) => {
  try {
    const loggedUser = req.user;
    const isEditAllowed = Object.keys(req.body).every((field) =>
      ALLOWED_USER_EDITS.includes(field),
    );
    if (!isEditAllowed) throw new Error("Invalid edit fields.");

    Object.keys(req.body).forEach((key) => (loggedUser[key] = req.body[key]));

    const updatedUser = await loggedUser.save();
    res.json({ success: true, data: updatedUser });
  } catch (error) {
    res.json({ success: false, message: (error as Error).message });
  }
});

router.patch(
  "/profile/password/change",
  userAuth,
  async (req: Request, res: Response) => {
    try {
      const { prePassword, newPassword } = req.body;

      if (
        !prePassword ||
        !newPassword ||
        !validator.isStrongPassword(prePassword) ||
        !validator.isStrongPassword(newPassword)
      )
        throw new Error("Credentials are Invalid!!");

      const user = req.user;
      const isMatch = await bcrypt.compare(prePassword, user.password);

      if (!isMatch) throw new Error("Credentials are Invalid!!");

      const newPassHash = await bcrypt.hash(newPassword, 10);
      user.password = newPassHash;
      await user.save();
      res.json({ success: true, message: "Password changed successfully." });
    } catch (error) {
      res.json({ success: false, message: (error as Error).message });
    }
  },
);

export default router;
