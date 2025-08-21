import { Request, Response } from "express";
import mongoose from "mongoose";
import ExpenseSchema from "../model/expenseModel";
export const getExpenseById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const expense = await ExpenseSchema.findById(id);

    if (!expense) {
      res.status(404).json({ success: false, message: "Expense not found" });
      return;
    }
    const expenseWithImage = {
      ...expense.toObject(),
      image: expense.image
        ? `${req.protocol}://${req.get("host")}${expense.image}`
        : null,
    };

    res.status(200).json({ success: true, data: expenseWithImage });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
