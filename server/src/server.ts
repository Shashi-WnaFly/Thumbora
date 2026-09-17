import "dotenv/config";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import connectDB from "./config/database.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "humorous-charm-production-3b25.up.railway.app",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());

import authRoutes from "./routes/auth.js";
import userProfile from "./routes/profile.js";
import userThumbnail from "./routes/user.js";
import resetRoutes from "./routes/reset.js";
import paymentRoutes from "./routes/payment.js";

app.get("/ping", (_req: Request, res: Response) => {
  return res.status(200).json({
    data: "pong",
    success: true,
  });
});

app.use("/", authRoutes);
app.use("/", userProfile);
app.use("/", userThumbnail);
app.use("/", resetRoutes);
app.use("/", paymentRoutes);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    console.log("database is successfully connected.");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(() => {
    console.log("database is not connected!");
  });
