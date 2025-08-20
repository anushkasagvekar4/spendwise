import { Request, Response } from "express";
import mongoose from "mongoose";
import ExpenseSchema from "../model/expenseModel";
export const getExpenseById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("started");
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid expense ID format" });
      return;
    }

    const expense = await ExpenseSchema.findById(id);

    if (!expense) {
      res.status(404).json({ success: false, message: "Expense not found" });
      return;
    }

    res.status(200).json({ success: true, data: expense });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
