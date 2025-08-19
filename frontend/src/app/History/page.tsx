"use client";
import React, { useState } from "react";
import Link from "next/link";
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import UpdateForm from "../update_form/page";
const History = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="p-4">
      <h1 className="font-bold text-xl mb-3">History</h1>
      <table border={2} className="w-full border border-grey-300 text-center">
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
          <tr>
            <td className="px-4 py-2">1</td>
            <td className="px-4 py-2">Income</td>
            <td className="px-4 py-2">4000</td>
            <td className="px-4 py-2">Spent on pizza</td>
            <td className="px-4 py-2">Food</td>
            <td className="px-4 py-2">12-11-2018</td>
            <td className="px-4 py-2 flex gap-2 justify-center ">
              <button
                className="text-green-600 cursor-pointer"
                onClick={openModal}
              >
                <MdEditSquare size={30} />
              </button>

              <button className="text-red-500 cursor-pointer">
                <MdDelete size={30} />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      {isOpen && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center">
          <div className="relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-700 font-bold"
            >
              <IoClose size={25} />
            </button>
            <UpdateForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
