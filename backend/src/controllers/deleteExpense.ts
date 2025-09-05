import { Request, Response } from "express";
import ExpenseSchema from "../model/expenseModel";

import { deleteFile } from "../utils/fileHelper";

export const deleteExpense = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res
        .status(400)
        .json({ success: false, message: "Expense ID is required" });
      return;
    }

    const deletedExpense = await ExpenseSchema.findByIdAndDelete(id);

    if (!deletedExpense) {
      res.status(404).json({ success: false, message: "Expense not found" });
      return;
    }

    if (deletedExpense.image) {
      deleteFile(deletedExpense.image);
    }

    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
      data: deletedExpense,
    });
  } catch (error: any) {
    console.error("Error deleting expense:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
