import express, { Express, NextFunction } from "express";
import { config } from "dotenv";
import cors from "cors";
import router from "./routes/expenseRoutes";
import { connectDb } from "./utils/db";
import path from "path";
import { CelebrateError } from "celebrate";
import { Request, Response } from "express";
import cookieParser from "cookie-parser";
const app: Express = express();

config();

const port = process.env.PORT || 8080;

connectDb();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/expenses", router);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  (
    err: CelebrateError | any,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error("Validation Error: ", err);
    if (err.joi) {
      return res.status(400).json({
        error: "Validation Error",
        details: err.joi.details.map((details: any) => details.message),
      });
    }
    return res.status(500).json({
      error: "Internal Server Error",
      message: err.message || "Something went wrong",
    });
  }
);

app.listen(port, () => console.log(`server running on ${port}`));
