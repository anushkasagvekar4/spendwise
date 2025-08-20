import { Request, Response } from "express";
import ExpenseSchema from "../model/expenseModel";
export const updateExpense = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    console.log("id:", id);
    const { amount, description, category, date, time } = req.body;

    if (!id) {
      res
        .status(400)
        .json({ success: false, message: "Expense ID is required" });
      return;
    }

    const updatedExpense = await ExpenseSchema.findByIdAndUpdate(
      id,
      { amount, description, category, date, time },
      { new: true, runValidators: true }
    );

    if (!updatedExpense) {
      res.status(404).json({ success: false, message: "Expense not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Expense updated",
      data: updatedExpense,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message || error,
    });
  }
};
