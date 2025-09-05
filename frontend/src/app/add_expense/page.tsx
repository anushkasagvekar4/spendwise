"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik, Formik } from "formik";
import { joiSchema } from "../JoiSchema/schema";
import { joiFormikAdapter } from "joi-formik-adapter";
import { CiSquareRemove } from "react-icons/ci";
import { toast } from "react-toastify";
import { toBase64 } from "../utility/file";
import { IoArrowBackCircle, IoClose } from "react-icons/io5";
// import { useAppSelector } from "../store/hook";
import Login from "../login";
import { Loader } from "@/components/Loader";

export type ExpenseFormValues = {
  amount: string;
  description: string;
  category: string[];
  date: string;
  time: string;
  image?: string | null;
};

const ExpenseForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
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

  const now = new Date();
  const formik = useFormik<ExpenseFormValues>({
    initialValues: {
      amount: "",
      description: "",
      category: [],
      date: now.toISOString().split("T")[0],
      time: now.toTimeString().slice(0, 5),
    },
    validationSchema: joiFormikAdapter(joiSchema),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        values.category = selectedTags;

        console.log("File:", file);

        let base64Image: string | null = null;
        if (file) {
          base64Image = await toBase64(file);
        }

        const payload = {
          amount: values.amount,
          description: values.description,
          date: values.date,
          time: values.time,
          category: selectedTags,
          image: base64Image,
        };
        console.log(payload);

        const res = await fetch(
          "http://localhost:3001/api/expenses/addExpense",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // Authorization: `Bearer ${token}`,
            },
            credentials: "include",

            body: JSON.stringify(payload),
          }
        );
        // if (res.status === 401) {
        //   toast.error("You are not signed in");
        //   router.push("/auth/login");
        //   return;
        // }

        const data = await res.json();

        if (data.success) {
          formik.resetForm();
          setSelectedTags([]);
          setFile(null);
          setPreview(null);
          toast.success("Expense added successfully!");
          router.push("/history");
        } else {
          toast.error(data.message || "Failed to add expense");
          console.error(data.message || "Failed to add expense");
        }
      } catch (err: unknown) {
        toast.error("Server error!");
        console.error("Server error:", err);
      } finally {
        setLoading(false); // stop loading
      }
    },
  });

  // if (!token) {
  //   return <Login />;
  // }

  return (
    <div className="max-w-md mx-auto shadow-lg  bg-amber-50 rounded-2xl p-6">
      <div>
        <h1 className="text-2xl text-amber-500 text-center mb-2 font-bold">
          Expense Form
        </h1>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={formik.handleSubmit} className="space-y-2">
          <div>
            <label className="block mb-1 font-medium">Amount:</label>
            <input
              type="number"
              value={formik.values.amount}
              name="amount"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Amount"
            />
            {formik.touched.amount && formik.errors.amount && (
              <p className="text-red-500">{formik.errors.amount}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              value={formik.values.description}
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Add Description Here"
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500">{formik.errors.description}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">Date:</label>
            <input
              type="date"
              name="date"
              value={formik.values.date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.date && formik.errors.date && (
              <p className="text-red-500">{formik.errors.date}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">Time:</label>
            <input
              type="time"
              name="time"
              value={formik.values.time}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {formik.touched.time && formik.errors.time && (
            <p className="text-red-500">{formik.errors.time}</p>
          )}
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
            {formik.touched.category && formik.errors.category && (
              <p className="text-white bg-amber-500">
                {formik.errors.category}
              </p>
            )}
          </div>
          <div>
            <input
              type="file"
              // accept="image/png, image/jpeg"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  console.log(e.target.files);
                  setFile(e.target.files[0]);
                  setPreview(URL.createObjectURL(e.target.files[0]));
                  formik.setFieldValue("image", e.target.files[0]);
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
            {formik.touched.image && formik.errors.image && (
              <p className="text-red-500">{formik.errors.image}</p>
            )}
            {preview && (
              <div className="relative mt-2 inline-block">
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-2 max-w-full max-h-64 mx-auto rounded-lg border border-gray-300 shadow-md object-contain"
                />

                <button
                  type="button"
                  onClick={() => {
                    setFile(null);
                    setPreview(null);
                  }}
                  className="absolute top-4 right-2   p-2"
                >
                  <CiSquareRemove
                    size={35}
                    className="text-white bg-amber-700"
                  />
                </button>
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-amber-700 rounded-lg hover:bg-amber-500 mt-3 py-2 text-white font-bold"
          >
            Submit
          </button>

          <button
            onClick={() => router.push("/history")}
            className=" absolute top-17 right-19"
          >
            <IoClose size={25} />
          </button>
        </form>
      )}
    </div>
  );
};

export default ExpenseForm;
