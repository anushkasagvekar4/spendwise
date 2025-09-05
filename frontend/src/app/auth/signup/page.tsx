"use client";
// import { signupSuccess } from "@/app/features/auth/authSlice";
import { signupSchema } from "@/app/JoiSchema/signupSchema";
// import { useAppDispatch, useAppSelector } from "@/app/store/hook";
import { joiResolver } from "@hookform/resolvers/joi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
export type SignupFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};
const page = () => {
  const router = useRouter();
  // const dispatch = useAppDispatch();
  // const token = useAppSelector((state) => state.auth.token);

  // useEffect(() => {
  //   if (token) router.push("/history");
  // }, [token, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: joiResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  console.log(errors);
  const onSubmit = async (data: SignupFormData) => {
    try {
      const res = await fetch("http://localhost:3001/api/expenses/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const data1 = await res.json();
      console.log(data1);

      if (data1.success) {
        // dispatch(signupSuccess({ token: data1.token, user: data1.user }));

        toast.success("Signup successful!");
        router.push("/auth/login");
      } else {
        toast.error(data1.message || "Signup failed");
      }
    } catch (err) {
      toast.error("Server error!");
      console.error("Server error:", err);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  rounded-2xl">
      <div className="bg-amber-50 p-6 rounded-lg max-w-md ">
        <div>
          <h1 className="text-2xl text-amber-500 text-center mb-2 font-bold">
            Signup
          </h1>
        </div>
        <div className="">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <div>
              <label htmlFor="">Enter Email:</label>
              <input
                type="email"
                {...register("email")}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="">Enter Password:</label>
              <input
                type="password"
                {...register("password")}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="">Confirm Password:</label>
              <input
                type="password"
                {...register("confirmPassword")}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-amber-700 rounded-lg  hover:bg-amber-500 mt-6 py-2 text-white font-bold"
            >
              {isSubmitting ? "Signing up..." : "Signup"}
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default page;
