import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

import authRoutes from "./routes/auth.ts";

app.use("/", authRoutes);

// app.use("/signup", (req: Request, res: Response) => {
//     res.send("Server is Live!");
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});