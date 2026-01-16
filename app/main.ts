import express from "express";
import type { Request, Response } from "express";
import connectDB from "../db/db";
import authRouter from "../router/authRouter";

const app = express();
const PORT = process.env.PORT || 3000;

await connectDB();

app.use(express.json());
app.use("/auth", authRouter);

app.get("/", async (_req: Request, res: Response) => {
  res.send("OK");
});

app.post("/", async (_req: Request, res: Response) => {
  res.send("POST OK");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
