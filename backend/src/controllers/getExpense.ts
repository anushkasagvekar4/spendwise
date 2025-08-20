import { Request, Response } from "express";
import ExpenseSchema from "../model/expenseModel";
export const getExpense = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const expenses = await ExpenseSchema.find().sort({ date: -1 });
    res.status(200).json({
      success: true,
      message: "Expenses fetched successfully",
      data: expenses,
    });
  } catch (error: any) {
    console.error(" Error fetching expenses:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message || error,
    });
  }
};
