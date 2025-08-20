"use client";
import React, { useState, useEffect } from "react";
interface UpdateFormProps {
  expenseId: string; // now TS knows it's a string
}
const UpdateForm: React.FC<UpdateFormProps> = ({ expenseId }) => {
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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
    const fetchExpense = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/expenses/getExpensesById/${expenseId}`
        );
        const data = await res.json();
        if (res.ok) {
          setAmount(data.amount);
          setDescription(data.description);
          setDate(data.date);
          setTime(data.time);
          setSelectedTags(data.category || []);
        } else {
          alert("Error fetching expense: " + data.message);
        }
      } catch (err) {
        console.error(err);
        alert("Server error while fetching expense");
      }
    };

    fetchExpense();
  }, [expenseId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      amount,
      description,
      date,
      time,
      category: selectedTags,
    };

    try {
      const res = await fetch(
        `http://localhost:5000/api/expenses/updateExpense/${expenseId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert("Expense updated successfully!");
        // optional: redirect or refresh data
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
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Amount"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            value={description}
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
            value={date}
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
            value={time}
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
