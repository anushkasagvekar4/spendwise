import { Request, Response } from "express";
import ExpenseSchema from "../model/expenseModel";
import { saveBase64Image } from "../utils/saveBase64Image";
import { deleteFile } from "../utils/fileHelper";
import { date } from "joi";

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
    const allowedFields = [
      "amount",
      "description",
      "category",
      "date",
      "time",
      "image",
    ];
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        if (field === "category") {
          try {
            updateData[field] = JSON.parse(req.body[field]);
          } catch (err) {
            updateData[field] = req.body[field];
          }
        } else if (field === "image" && req.body[field]) {
          const expense = await ExpenseSchema.findById(id);
          if (expense?.image) deleteFile(expense.image);
          updateData[field] = saveBase64Image(req.body[field]);
        } else {
          updateData[field] = req.body[field];
        }
      }
    }

    const updatedExpense = await ExpenseSchema.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    console.log(updatedExpense);
    if (!updatedExpense) {
      res.status(404).json({ success: false, message: "Expense not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Expense updated",
      data: {
        ...updatedExpense.toObject(),
        image: updatedExpense.image
          ? `${req.protocol}://${req.get("host")}${updatedExpense.image}`
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
