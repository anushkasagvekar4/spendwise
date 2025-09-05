"use client";
import { loginSchema } from "@/app/JoiSchema/loginSchema";
import { useFormik } from "formik";
import { joiFormikAdapter } from "joi-formik-adapter";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
// import { useAppDispatch, useAppSelector } from "@/app/store/hook";
// import { loginSuccess } from "@/app/features/auth/authSlice";
import Link from "next/link";
import { useAppDispatch } from "@/app/store/hook";
import { loginSuccess } from "@/app/features/auth/authSlice";

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  // const token = useAppSelector((state) => state.auth.token);

  // useEffect(() => {
  //   if (token) router.push("/history");
  // }, [token, router]);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: joiFormikAdapter(loginSchema),
    onSubmit: async (values) => {
      try {
        const res = await fetch("http://localhost:3001/api/expenses/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(values),
        });
        const data = await res.json();
        console.log(data);

        if (data.success) {
          dispatch(loginSuccess({ user: data.user }));
          formik.resetForm();
          toast.success("login successful!");
          router.push("/history");
        } else {
          toast.error(data.message || "Failed to add expense");
          console.error(data.message || "Failed to add expense");
        }
      } catch (err: unknown) {
        toast.error("Server error!");
        console.error("Server error:", err);
      }
    },
  });
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  rounded-2xl">
      <div className="bg-amber-50 p-6 rounded-lg max-w-md ">
        <div>
          <h1 className="text-2xl text-amber-500 text-center mb-2 font-bold">
            Login
          </h1>
        </div>
        <div className="">
          <form onSubmit={formik.handleSubmit} className="space-y-2">
            <div>
              <label htmlFor="email">Enter Email:</label>
              <input
                type="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm">
                  {formik.errors.email}
                </div>
              )}
            </div>
            <div>
              <label htmlFor="">Enter Password:</label>
              <input
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm">
                  {formik.errors.password}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-amber-700 rounded-lg  hover:bg-amber-500 mt-6 py-2 text-white font-bold"
            >
              Login
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-4">
            Don’t have an account?{" "}
            <Link href="/auth/signup" className="text-blue-500 hover:underline">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
