import { Request, Response } from "express";
import ExpenseSchema from "../model/expenseModel";

export const addExpense = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { amount, description, category, date, time } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    let categories: string[] = [];
    if (Array.isArray(category)) {
      categories = category;
    } else if (typeof category === "string" && category.trim() !== "") {
      categories = [category];
    }

    if (!amount || !description || categories.length === 0 || !date || !time) {
      res
        .status(400)
        .json({ success: false, message: "All fields are required" });
      return;
    }

    const expense = new ExpenseSchema({
      amount,
      description,
      category: categories,
      date,
      time,
      image,
    });

    await expense.save();

    res.status(201).json({
      success: true,
      message: "Expense created successfully",
      data: {
        ...expense.toObject(),
        image: expense.image
          ? `${req.protocol}://${req.get("host")}${expense.image}`
          : null,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message || error,
    });
  }
};
