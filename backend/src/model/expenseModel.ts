import mongoose, { Schema, Document } from "mongoose";

export interface IExpense extends Document {
  amount: number;
  description: string;
  category: string[];
  date: Date;
  time: string;
}

const ExpenseSchema: Schema = new Schema(
  {
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [1, "Amount must be greater than 0"],
    },
    description: {
      type: String,
      required: [true, "Amount is required"],
      minlength: [3, "Description must be at least 3 characters"],
      maxlength: [100, "Description cannot exceed 100 characters"],
    },
    category: {
      type: [String],
      required: [true, "category is required"],
      enum: [
        "Bills",
        "Movie",
        "Grocery",
        "Shopping",
        "Medicine",
        "Other",
        "Food",
      ],
    },
    time: {
      type: String,
      required: [true, "time is required"],
      match: [/^\d{2}:\d{2}$/, "Time must be in HH:MM format"],
    },
    date: {
      type: Date,
      required: [true, "date is required"],
      match: [/^\d{2}:\d{2}$/, "Time must be in HH:MM format"],
    },
  },
  { timestamps: true }
);

export default mongoose.model<IExpense>("Expense", ExpenseSchema);
