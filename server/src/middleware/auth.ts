import express, { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser } from "../types.js";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

const router = express.Router();

router.use("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies;

    if (!token) throw new Error("Credentials are Invalid!!");

    const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const user = await User.findById({ _id: userId });

    if (!user) throw new Error("user not found!!");

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ success: false, message: (error as Error).message });
  }
});
