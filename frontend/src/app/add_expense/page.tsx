"use client";
import React, { useState } from "react";

const ExpenseForm = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const allTags = [
    "Bills",
    "Movie",
    "Grocery",
    "Shopping",
    "Medicine",
    "Food",
    "Other",
  ];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagsClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !amount ||
      !description ||
      selectedTags.length === 0 ||
      !date ||
      !time
    ) {
      setMessage("Please fill all fields and select at least one tag");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/expenses/addExpense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          description,
          category: selectedTags,
          date,
          time,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Expense added successfully!");

        setAmount("");
        setDescription("");
        setDate("");
        setTime("");
        setSelectedTags([]);
      } else {
        setMessage(data.message || "Failed to add expense");
      }
    } catch (err: unknown) {
      console.error("Server error:", err);
      setMessage("Server error. Try again later.");
    }
  };

  return (
    <div className="max-w-md mx-auto shadow-lg rounded-2xl p-6">
      <div>
        <h1 className="text-2xl text-amber-700 text-center mb-2">
          Expense Form
        </h1>
      </div>
      {message && <p className="mb-2 text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Amount"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Optional notes..."
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Time:</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
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

export default ExpenseForm;
