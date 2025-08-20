import { Request, Response } from "express";
import ExpenseSchema from "../model/expenseModel";

export const updateExpense = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    5;
    if (!id) {
      res
        .status(400)
        .json({ success: false, message: "Expense ID is required" });
      return;
    }

    const updateData: any = {};
    const allowedFields = ["amount", "description", "category", "date", "time"];

    // Only add fields that exist in req.body
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const updatedExpense = await ExpenseSchema.findByIdAndUpdate(
      id,
      { $set: updateData }, // only updates the fields in updateData
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
