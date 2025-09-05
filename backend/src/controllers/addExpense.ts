import { Request, Response } from "express";
import ExpenseSchema from "../model/expenseModel";
import { JwtPayload } from "jsonwebtoken";
import { AuthRequest } from "../middleware/Auth";
import { saveBase64Image } from "../utils/saveBase64Image"; // ✅ Import helper

export const addExpense = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { amount, description, category, date, time, image } = req.body;

    let categories: string[] = [];
    if (Array.isArray(category)) {
      categories = category;
    } else if (typeof category === "string" && category.trim() !== "") {
      categories = [category];
    }

    const user = req.user as JwtPayload | undefined;
    const userId = user?.id;
    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    let imagePath: string | null = null;

    if (image && typeof image === "string" && image.trim() !== "") {
      imagePath = saveBase64Image(image);
    }

    const expense = new ExpenseSchema({
      amount,
      description,
      category: categories,
      date,
      time,
      image: imagePath,
      user: userId,
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
