import React from "react";
import Link from "next/link";
import { IoMdHome } from "react-icons/io";
import { GrFormAdd } from "react-icons/gr";

const Dashboard = () => {
  return (
    <nav className="mih-h-screen flex p-2 bg-amber-700 text-white">
      <div className="text-2xl items-center p-1 font-bold">SpendWise</div>
      <div className="ml-auto">
        <ul className="flex">
          <li className="p-2 ">
            <Link href={"/"} className="flex items-center gap-2">
              <IoMdHome />
              Home
            </Link>
          </li>
          <li className="p-2 gap-1">
            <Link href={"/add_expense"} className="flex items-center gap-2">
              <GrFormAdd />
              Add Expense
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Dashboard;
