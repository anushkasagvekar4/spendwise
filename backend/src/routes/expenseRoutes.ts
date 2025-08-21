import { Router } from "express";
import { addExpense } from "../controllers/addExpense";
import { getExpense } from "../controllers/getExpense";
import { getExpenseById } from "../controllers/getExpenseById";
import { updateExpense } from "../controllers/updateExpense";
import { deleteExpense } from "../controllers/deleteExpense";
import upload from "../middleware/upload";

const router = Router();

router.post("/addExpense", upload.single("image"), addExpense);
router.get("/getExpense", getExpense);
router.get("/getExpenseById/:id", getExpenseById);
router.patch("/updateExpense/:id", upload.single("image"), updateExpense);
router.delete("/deleteExpense/:id", deleteExpense);

export default router;
