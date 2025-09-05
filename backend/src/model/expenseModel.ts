import mongoose, { Schema, Document } from "mongoose";

export interface IExpense extends Document {
  user: string;
  amount: number;
  description: string;
  category: string[];
  date: Date;
  time: string;
  image?: string;
}

const ExpenseSchema: Schema = new Schema(
  {
    user: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: [String],
      required: true,
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
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IExpense>("Expense", ExpenseSchema);
