"use client";
import React, { useState } from "react";

const ExpenseForm = () => {
  const allTags = [
    "Bills",
    "Movie",
    "Grocery",
    "Shopping",
    "Medicine",
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
  return (
    <div className="max-w-md mx-auto shadow-lg rounded-2xl p-6">
      <div>
        <h1 className="text-2xl text-amber-700 text-center mb-2">
          Expense Form
        </h1>
      </div>
      <form action="" className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Amount:</label>
          <input
            type="number"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Amount"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Optional notes..."
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Date:</label>
          <input
            type="date"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Time:</label>
          <input
            type="time"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
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

export default ExpenseForm;
