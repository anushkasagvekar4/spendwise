import { Router } from "express";
import { addExpense } from "../controllers/addExpense";
import { getExpense } from "../controllers/getExpense";
import { getExpenseById } from "../controllers/getExpenseById";
import { updateExpense } from "../controllers/updateExpense";
import { deleteExpense } from "../controllers/deleteExpense";
import { celebrate } from "celebrate";
import {
  addExpenseSchema,
  deleteExpenseSchema,
  getExpenseByIdSchema,
  updateExpenseSchema,
} from "../validations/expenseValidator";
import { login, logout, signup } from "../controllers/authController";
import { loginSchema, signupSchema } from "../validations/userValidator";
import ensureAuthenticated from "../middleware/Auth";

const router = Router();

router.post("/signup", celebrate(signupSchema), signup);
router.post("/login", celebrate(loginSchema), login);
router.post("/logout", ensureAuthenticated, logout);

router.post(
  "/addExpense",
  ensureAuthenticated,
  celebrate(addExpenseSchema),
  addExpense
);

router.get("/getExpense", ensureAuthenticated, getExpense);

router.get(
  "/getExpenseById/:id",
  ensureAuthenticated,
  celebrate(getExpenseByIdSchema),
  getExpenseById
);

router.patch(
  "/updateExpense/:id",
  ensureAuthenticated,
  celebrate(updateExpenseSchema),
  updateExpense
);

router.delete(
  "/deleteExpense/:id",
  ensureAuthenticated,
  celebrate(deleteExpenseSchema),
  deleteExpense
);

export default router;
