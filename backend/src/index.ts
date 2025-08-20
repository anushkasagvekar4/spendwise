import express, { Express } from "express";
import { config } from "dotenv";
import cors from "cors";
import router from "./routes/expenseRoutes";
import { connectDb } from "./utils/db";

const app: Express = express();

config();

const port = process.env.PORT || 8080;

connectDb();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.use("/api/expenses/", router);
app.listen(port, () => console.log(`server running on ${port}`));
