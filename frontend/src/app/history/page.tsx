"use client";
import React, { useState, useEffect } from "react";
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";

import { toast } from "react-toastify";
import UpdateForm from "../update_form/page";
import { useRouter } from "next/navigation";
// import { useAppSelector } from "../store/hook";
import { IoIosAddCircle } from "react-icons/io";
import Login from "../login";
import Swal from "sweetalert2";
import { Loader } from "@/components/Loader";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface Expense {
  _id: string;
  amount: number;
  description: string;
  category: string[];
  date: string;
  time: string;
  image: string;
}

const History = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedExpenseId, setSelectedExpenseId] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  // const token = useAppSelector((state) => state.auth.token);
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        // setLoading(true);
        const res = await fetch(
          "http://localhost:3001/api/expenses/getExpense",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );

        // if (res.status === 401) {
        //   toast.error("You are not signed in");
        //   router.push("/auth/login");
        //   return;
        // }
        const data = await res.json();
        if (data.success) {
          setExpenses(data.data);
        }
      } catch (err: unknown) {
        console.error("Error fetching expenses:", err);
        toast.error("Failed to fetch expenses");
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, []);

  const deleteExpense = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(
            `http://localhost:3001/api/expenses/deleteExpense/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",

                // Authorization: `Bearer ${token}`,
              },
              credentials: "include",
            }
          );

          const data = await res.json();
          if (data.success) {
            setExpenses((prev) => prev.filter((expense) => expense._id !== id));
            Swal.fire("Deleted!", "Your expense has been deleted.", "success");
          } else {
            Swal.fire(
              "Error!",
              data.message || "Failed to delete expense",
              "error"
            );
          }
        } catch (err: unknown) {
          console.error("Error deleting expense", err);
          Swal.fire("Error!", "Server error, try again later", "error");
        }
      }
    });
  };

  const openModal = (id: string) => {
    setSelectedExpenseId(id);
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);

  // if (!token) return <Login />;

  return (
    <div className="p-4 ">
      <h1 className="font-bold text-2xl mb-3 text-center text-amber-500">
        History
      </h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table
            border={2}
            className="w-full min-w-[600px] bg-amber-100 border border-grey-300 overflow-x-auto text-center"
          >
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Sr No.</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Action</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses && expenses.length > 0 ? (
                expenses.map((expense, index) => (
                  <TableRow key={expense._id}>
                    <TableCell className="px-4 py-2">{index + 1}</TableCell>
                    <TableCell className="px-4 py-2">
                      {expense.amount}
                    </TableCell>
                    <TableCell className="px-4 py-2">
                      {expense.description}
                    </TableCell>
                    <TableCell className="px-4 py-2">
                      {expense.category.join(",")}
                    </TableCell>
                    <TableCell className="px-4 py-2">
                      {expense.date
                        ? new Date(expense.date).toLocaleDateString("en-GB")
                        : ""}
                    </TableCell>
                    <TableCell className="px-4 py-2">{expense.time}</TableCell>
                    <TableCell className="px-4 py-2">
                      {expense.image ? (
                        <a
                          href={expense.image}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-700 underline"
                        >
                          View Image
                        </a>
                      ) : (
                        "No Image"
                      )}
                    </TableCell>
                    <TableCell className="px-4 py-2 flex gap-2 justify-center ">
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
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableCell>
                  <TableCell colSpan={7}>No expenses found</TableCell>
                </TableCell>
              )}
            </TableBody>
          </Table>
        </div>
      )}
      {isOpen && selectedExpenseId && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center">
          <div className="relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-8 text-gray-700 font-bold"
            >
              <IoClose size={25} />
            </button>
            <UpdateForm expenseId={selectedExpenseId} />
          </div>
        </div>
      )}

      <button
        onClick={() => router.push("/add_expense")}
        className=" fixed bottom-5 right-6 "
      >
        <IoIosAddCircle
          size={50}
          className=" text-amber-700 hover:bg-amber-600 transition"
        />
      </button>
    </div>
  );
};

export default History;
