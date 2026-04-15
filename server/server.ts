import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/database.ts";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());

import authRoutes from "./src/routes/auth.ts";

app.use("/", authRoutes);

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
