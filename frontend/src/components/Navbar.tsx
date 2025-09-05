"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoMdLogIn, IoMdLogOut } from "react-icons/io";
import { RiUserAddLine } from "react-icons/ri";

import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "@/app/store/hook";
import { logout } from "@/app/features/auth/authSlice";

const Dashboard = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch("http://localhost:3001/api/expenses/logout", {
          method: "POST",
          credentials: "include",
        });
        dispatch(logout());
        router.push("/");
      }
    });
  };
  return (
    <nav className="w-full bg-amber-700 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo / Brand */}
        <div className="text-2xl font-bold tracking-wide">SpendWise</div>

        {/* Right Section */}
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm md:text-base">
                Welcome, <span className="font-semibold">{user.email}</span>
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white text-amber-700 hover:bg-amber-100 transition"
              >
                <IoMdLogOut size={18} />
                Logout
              </button>
            </div>
          ) : (
            <ul className="flex items-center gap-4">
              <li>
                <Link
                  href="/auth/login"
                  className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white text-amber-700 hover:bg-amber-100 transition"
                >
                  <IoMdLogIn size={18} />
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/signup"
                  className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white text-amber-700 hover:bg-amber-100 transition"
                >
                  <RiUserAddLine size={18} />
                  Signup
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Dashboard;
