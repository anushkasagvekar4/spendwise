"use client";
import React, { useState, useEffect } from "react";
import { Expense } from "../page";
interface UpdateFormProps {
  expenseId: string;
}
const UpdateForm: React.FC<UpdateFormProps> = ({ expenseId }) => {
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const allTags = [
    "Bills",
    "Movie",
    "Grocery",
    "Shopping",
    "Medicine",
    "Food",
    "Other",
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

        if (!res.ok || !data) {
          alert("Error fetching expense: " + (data.message || "Unknown error"));
          return;
        }
        const expense = data.data;
        setAmount(expense.amount || "");
        setDescription(expense.description || "");
        setDate(expense.date ? expense.date.split("T")[0] : "");
        setTime(
          expense.time
            ? (() => {
                const [h, m] = expense.time.split(":").map(Number);
                return `${String(h).padStart(2, "0")}:${String(
                  Math.min(m, 59)
                ).padStart(2, "0")}`;
              })()
            : ""
        );
        setSelectedTags(expense.category || []);
        if (expense.image) setPreview(expense.image);
      } catch (err: unknown) {
        console.error("Error fetching expense:", err);
        alert("Server error while fetching expense");
      }
    };

    fetchExpense();
  }, [expenseId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("amount", amount);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("time", time);
    formData.append("category", JSON.stringify(selectedTags));
    if (image) formData.append("image", image);

    try {
      const res = await fetch(
        `http://localhost:3001/api/expenses/updateExpense/${expenseId}`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Expense updated successfully!");
      } else {
        alert("Error: " + data.message);
      }
    } catch (err: unknown) {
      console.error("Server error, try again later.", err);
    }
  };

  return (
    <div className="bg-opacity max-w-md max-h-[80vh] overflow-y-auto mx-auto flex-1 ">
      <form
        onSubmit={handleSubmit}
        className="space-y-2 p-6 bg-amber-50 rounded-2xl"
      >
        <div>
          <h1 className="text-2xl text-amber-500 text-center mb-2 font-bold">
            {" "}
            Update Expense
          </h1>
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
            placeholder="Add Description Here"
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
        <div>
          <label className="block mb-1 font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImage(e.target.files[0]);
                setPreview(URL.createObjectURL(e.target.files[0]));
              }
            }}
            className="w-full text-sm text-gray-500
               file:mr-4 file:py-2 file:px-4
               file:rounded-full file:border-0
               file:text-sm file:font-semibold
               file:bg-amber-700 file:text-white
               hover:file:bg-amber-500
               focus:outline-none focus:ring-2 focus:ring-amber-500
               cursor-pointer"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 max-w-full max-h-64 mx-auto rounded-lg border border-gray-300 shadow-md object-contain"
            />
          )}
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
