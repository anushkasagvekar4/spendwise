"use client";
import React, { useState, useEffect } from "react";
import { Expense } from "../History/page";
interface UpdateFormProps {
  expenseId: string;
}
const UpdateForm: React.FC<UpdateFormProps> = ({ expenseId }) => {
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [data, setData] = useState<Expense>();

  const allTags = [
    "Bills",
    "Movie",
    "Grocery",
    "Shopping",
    "Medicine",
    "Other",
    "Food",
  ];

  const handleTagsClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  useEffect(() => {
    if (!expenseId) return;

    const fetchExpense = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/expenses/getExpenseById/${expenseId}`
        );
        const data = await res.json();

        setData(data.data);

        if (res.ok && data) {
          const expense = data.data;
        } else {
          alert("Error fetching expense: " + (data.message || "Unknown error"));
        }
      } catch (err) {
        alert("Server error while fetching expense");
      }
    };

    fetchExpense();
  }, [expenseId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: any = {};
    if (amount) payload.amount = Number(amount);
    if (description) payload.description = description;
    if (date) payload.date = date;
    if (time) payload.time = time;
    if (selectedTags.length) payload.category = selectedTags;

    console.log(expenseId);
    try {
      const res = await fetch(
        `http://localhost:3001/api/expenses/updateExpense/${expenseId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      console.log(data);
      if (res.ok) {
        alert("Expense updated successfully!");
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Server error, try again later.");
    }
  };

  return (
    <div className="bg-opacity w-[350] ">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-6 bg-amber-50 rounded-2xl"
      >
        <div>
          <label className="block mb-1 font-medium">Amount:</label>
          <input
            type="number"
            defaultValue={data?.amount}
            onChange={(e) => {
              setAmount(e.target.value);
              console.log("state", data);
            }}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Amount"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            defaultValue={data?.description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Optional notes..."
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Date:</label>
          <input
            type="date"
            defaultValue={data?.date ? data.date.split("T")[0] : ""}
            onChange={(e) => {
              setDate(e.target.value);
            }}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Time:</label>
          <input
            type="time"
            defaultValue={
              data?.time
                ? (() => {
                    const [h, m] = data.time.split(":").map(Number);
                    const minutes = Math.min(m, 59); // fix invalid minutes > 59
                    return `${String(h).padStart(2, "0")}:${String(
                      minutes
                    ).padStart(2, "0")}`;
                  })()
                : ""
            }
            onChange={(e) => {
              setTime(e.target.value);
            }}
            className="w-full p-2 mb-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Select Tags:</label>
          {allTags.map((tag, i) => (
            <button
              type="button"
              onClick={() => handleTagsClick(tag)}
              key={i}
              className={`rounded-full border m-2 px-3 py-1 ${
                selectedTags.includes(tag)
                  ? "bg-amber-700 text-white"
                  : "bg-white"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        <button
          type="submit"
          className="w-full bg-amber-700 rounded-lg hover:bg-amber-500 py-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateForm;
