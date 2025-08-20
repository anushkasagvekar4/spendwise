import { Router } from "express";
import { addExpense } from "../controllers/addExpense";
import { getExpense } from "../controllers/getExpense";
import { getExpenseById } from "../controllers/getExpenseById";
import { updateExpense } from "../controllers/updateExpense";
import { deleteExpense } from "../controllers/deleteExpense";

const router = Router();

router.post("/addExpense", addExpense);
router.get("/getExpense", getExpense);
router.get("/getExpenseById/:id", getExpenseById);
router.patch("/updateExpense/:id", updateExpense);
router.delete("/deleteExpense/:id", deleteExpense);

export default router;
