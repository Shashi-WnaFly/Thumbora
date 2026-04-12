import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 7777;

app.use("/", (req: Request, res: Response) => {
    res.send("Server is Live!");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});