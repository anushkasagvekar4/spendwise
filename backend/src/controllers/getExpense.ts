import { Request, Response } from "express";
import ExpenseSchema from "../model/expenseModel";

export const getExpense = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const expenses = await ExpenseSchema.find().sort({ date: -1 });
    const host = `${req.protocol}://${req.get("host")}`;
    const expensesWithImageURL = expenses.map((exp) => ({
      ...exp.toObject(),
      image: exp.image ? `${host}${exp.image}` : null,
    }));

    res.status(200).json({
      success: true,
      message: "Expenses fetched successfully",
      data: expensesWithImageURL,
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
