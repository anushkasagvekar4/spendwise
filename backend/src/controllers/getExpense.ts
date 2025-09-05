import { getImageUrl } from "./../utils/getImageUrl";
import { Request, Response } from "express";
import ExpenseSchema from "../model/expenseModel";
import { JwtPayload } from "jsonwebtoken";
import { AuthRequest } from "../middleware/Auth";

export const getExpense = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const user = req.user as JwtPayload | undefined;
    const userId = user?.id;

    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const expenses = await ExpenseSchema.find({ user: userId }).sort({
      date: -1,
    });

    const expensesWithImageURL = expenses.map((exp) => ({
      ...exp.toObject(),
      image: getImageUrl(req, exp.image !== undefined ? exp.image : null),
    }));

    res.status(200).json({
      success: true,
      message: "Expenses fetched successfully",
      data: expensesWithImageURL,
    });
  } catch (error: any) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message || error,
    });
  }
};
