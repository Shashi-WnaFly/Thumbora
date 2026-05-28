import express, { Request, Response } from "express";
import { userAuth } from "../middleware/auth.js";
import { ALLOWED_USER_EDITS } from "../utils/constants.js";
import validator from "validator";
import bcrypt from "bcrypt";
import { safeUser } from "../utils/common.js";

const router = express.Router();

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
    req.user = updatedUser;
    res.json({
      success: true,
      data: safeUser(updatedUser),
      message: "Profile edit successfully.",
    });
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
      const normalizedPrePassword = prePassword ? prePassword.trim() : "";
      const normalizedNewPassword = newPassword ? newPassword.trim() : "";
      if (
        !normalizedPrePassword ||
        !normalizedNewPassword ||
        !(normalizedNewPassword.length >= 8) ||
        !validator.isStrongPassword(normalizedNewPassword, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
      )
        throw new Error("Credentials are invalid!!");

      const user = req.user;
      const isMatch = await bcrypt.compare(
        normalizedPrePassword,
        user.password,
      );

      if (!isMatch) throw new Error("Credentials are invalid!!");

      const newPassHash = await bcrypt.hash(normalizedNewPassword, 10);
      user.password = newPassHash;
      await user.save();
      res.json({
        success: true,
        data: safeUser(user),
        message: "Password changed successfully.",
      });
    } catch (error) {
      res.json({ success: false, message: (error as Error).message });
    }
  },
);

export default router;
