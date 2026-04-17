import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/database.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());

import authRoutes from "./routes/auth.js";
import userProfile from "./routes/profile.js";

app.use("/", authRoutes);
app.use("/", userProfile);

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
