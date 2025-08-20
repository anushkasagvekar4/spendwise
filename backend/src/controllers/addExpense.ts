import { Request, Response } from "express";
import ExpenseSchema from "../model/expenseModel";

export const addExpense = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { amount, description, category, date, time } = req.body;
    if (!amount || !description || !category || !date || !time) {
      res
        .status(400)
        .json({ success: false, message: "All fields are required" });
      return;
    }
    const expense = new ExpenseSchema({
      amount,
      description,
      category,
      date,
      time,
    });
    await expense.save();
    res.status(201).json({
      success: true,
      message: "Expense created successfully",
      data: expense,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message || error,
    });
  }
};
