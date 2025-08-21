"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
const ExpenseForm = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [messageType, setMessageType] = useState<"error" | "success" | "">("");
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
      setMessageType("error");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("amount", amount);
      formData.append("description", description);
      formData.append("date", date);
      formData.append("time", time);
      selectedTags.forEach((tag) => formData.append("category", tag));
      if (file) formData.append("image", file);

      const res = await fetch("http://localhost:3001/api/expenses/addExpense", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setMessage("Expense added successfully!");
        setMessageType("success");
        setAmount("");
        setDescription("");
        setDate("");
        setTime("");
        setSelectedTags([]);
        setFile(null);
        setPreview(null);
        router.push("/");
      } else {
        setMessage(data.message || "Failed to add expense");
        setMessageType("error");
      }
    } catch (err: unknown) {
      console.error("Server error:", err);
      setMessage("Server error. Try again later.");
      setMessageType("error");
    }
  };

  return (
    <div className="max-w-md mx-auto shadow-lg  bg-amber-50 rounded-2xl p-6">
      <div>
        <h1 className="text-2xl text-amber-500 text-center mb-2 font-bold">
          Expense Form
        </h1>
      </div>
      {message && (
        <p
          className={`mb-2 ${
            messageType === "error" ? "text-red-500" : "text-green-500"
          }`}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-2 ">
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
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setFile(e.target.files[0]);
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
          className="w-full bg-amber-700 rounded-lg hover:bg-amber-500 py-2 text-white font-bold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
