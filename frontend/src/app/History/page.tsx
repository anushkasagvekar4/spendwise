"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { BiSolidFileExport } from "react-icons/bi";
import { CSVLink } from "react-csv";
import UpdateForm from "../update_form/page";

interface Expense {
  _id: string;
  amount: number;
  description: string;
  category: string[];
  date: string;
  time: string;
}

const History = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedExpenseId, setSelectedExpenseId] = useState<string | null>(
    null
  );
  // const [data, setData] = useState<Expense>();
  const openModal = (id: string) => {
    setSelectedExpenseId(id);
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/expenses/getExpense"
        );
        const data = await res.json();
        if (data.success) {
          setExpenses(data.data);
        }
      } catch (err) {
        console.error("Error fetching expenses:", err);
      }
    };
    fetchExpenses();
  }, []);

  const deleteExpense = async (id: string) => {
    if (!confirm("Are you sure you want to delete this expense?")) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/expenses/deleteExpense/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      console.log(data);
      // console.log(data);

      if (data.success) {
        setExpenses((prev) => prev.filter((expense) => expense._id !== id));
        alert("Expense deleted successfully");
      } else {
        alert(data.message || "Failed to delete expense");
      }
    } catch (err) {
      console.error("Error deleting expense:", err);
      alert("Error deleting expense");
    }
  };

  return (
    <div className="p-4">
      <h1 className="font-bold text-xl mb-3">History</h1>
      <div className="flex flex-wrap justify-end items-center gap-5 mb-4">
        <label htmlFor="">Filter:</label>
        <input type="date" className="border p-1 rounded" />
        <span>To</span>
        <input type="date" className="border p-1 rounded" />
        <input
          type="search"
          placeholder="search here"
          className="border p-1 rounded"
        />
        <CSVLink
          data={expenses}
          filename={"history.csv"}
          className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Export CSV
        </CSVLink>
      </div>
      <div className="overflow-x-auto">
        <table
          border={2}
          className="w-full min-w-[600px] border border-grey-300 overflow-x-auto text-center"
        >
          <thead className="bg-amber-500">
            <tr>
              <th>Sr No.</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Category</th>
              <th>Date</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses?.map((expense, index) => (
              <tr key={expense._id}>
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{expense.amount}</td>
                <td className="px-4 py-2">{expense.description}</td>
                <td className="px-4 py-2">{expense.category.join(", ")}</td>
                <td className="px-4 py-2">{expense.date}</td>
                <td className="px-4 py-2">{expense.time}</td>
                <td className="px-4 py-2 flex gap-2 justify-center ">
                  <button
                    className="text-green-600 cursor-pointer"
                    onClick={() => openModal(expense._id)}
                  >
                    <MdEditSquare size={30} />
                  </button>

                  <button
                    onClick={() => deleteExpense(expense._id)}
                    className="text-red-500 cursor-pointer"
                  >
                    <MdDelete size={30} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center">
          <div className="relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-700 font-bold"
            >
              <IoClose size={25} />
            </button>
            <UpdateForm expenseId={selectedExpenseId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
