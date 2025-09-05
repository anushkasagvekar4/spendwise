import { Request, Response } from "express";
import mongoose from "mongoose";
import ExpenseSchema from "../model/expenseModel";
import { getImageUrl } from "../utils/getImageUrl";

export const getExpenseById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ success: false, message: "Invalid expense ID" });
      return;
    }

    const expense = await ExpenseSchema.findById(id);

    if (!expense) {
      res.status(404).json({ success: false, message: "Expense not found" });
      return;
    }

    const expenseWithImage = {
      ...expense.toObject(),
      image: getImageUrl(
        req,
        expense.image !== undefined ? expense.image : null
      ),
    };

    res.status(200).json({ success: true, data: expenseWithImage });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message || error,
    });
  }
};
