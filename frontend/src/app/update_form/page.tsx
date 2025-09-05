"use client";
import React, { useState, useEffect } from "react";
import { ExpenseFormValues } from "../add_expense/page";
import { useFormik } from "formik";
import { joiFormikAdapter } from "joi-formik-adapter";
import { CiSquareRemove } from "react-icons/ci";
import { joiUpdateSchema } from "../JoiSchema/updateExpenseSchema";
import { toast } from "react-toastify";
import { toBase64 } from "../utility/file";
import { Loader } from "@/components/Loader";
import { useRouter } from "next/navigation";
interface UpdateFormProps {
  expenseId: string;
  onUpdate?: () => void;
}
const UpdateForm: React.FC<UpdateFormProps> = ({ expenseId, onUpdate }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const allTags = [
    "Bills",
    "Movie",
    "Grocery",
    "Shopping",
    "Medicine",
    "Food",
    "Other",
  ];
  const now = new Date();
  const router = useRouter();
  const [initialValues, setInitialValues] = useState<ExpenseFormValues>({
    amount: "",
    description: "",
    category: [],
    date: `${now.getDate()}-${now.getMonth()}-${now.getFullYear()}`,
    time: now.toTimeString().slice(0, 5),
  });

  const handleTagsClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  useEffect(() => {
    // if (!expenseId) return;

    const fetchExpense = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:3001/api/expenses/getExpenseById/${expenseId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await res.json();
        console.log(data);

        if (!res.ok || !data) {
          toast.error(
            "Error fetching expense: " + (data.message || "Unknown error")
          );
          return;
        }
        const expense = data.data;
        setInitialValues({
          amount: expense.amount || "",
          description: expense.description || "",
          category: expense.category || [],
          date: expense.date.split("T")[0],
          time: expense.time,
        });
        setSelectedTags(expense.category || []);
        if (expense.image) setPreview(expense.image);
      } catch (err: unknown) {
        console.error("Error fetching expense:", err);
        alert("Server error while fetching expense");
      } finally {
        setLoading(false);
      }
    };

    fetchExpense();
  }, [expenseId]);

  const formik = useFormik<ExpenseFormValues>({
    initialValues,
    enableReinitialize: true,
    validationSchema: joiFormikAdapter(joiUpdateSchema),
    onSubmit: async (values) => {
      setLoading(true);
      let base64Image: string | null = null;
      if (image) {
        base64Image = await toBase64(image);
      }

      const payload = {
        ...values,
        category: selectedTags,
        image: base64Image,
      };
      console.log(payload);
      try {
        const res = await fetch(
          `http://localhost:3001/api/expenses/updateExpense/${expenseId}`,
          {
            method: "PATCH",
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
        //   router.push("/auth/login"); //
        //   return;
        // }

        const data = await res.json();
        console.log(data);

        if (res.ok) {
          toast.success("Expense updated successfully!");
        } else {
          toast.error("Error: " + data.message);
        }
      } catch (err) {
        console.error("Server error, try again later.", err);
        toast.error("Server error, try again later.");
      } finally {
        setLoading(false); // stop loader no matter what
      }
    },
  });

  return (
    <div className="bg-opacity max-w-md max-h-[80vh] overflow-y-auto mx-auto flex-1 ">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : (
        <form
          onSubmit={formik.handleSubmit}
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
              name="amount"
              value={formik.values.amount}
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
              name="description"
              value={formik.values.description}
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.time && formik.errors.time && (
              <p className="text-red-500">{formik.errors.time}</p>
            )}
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
              // accept="image/png, image/jpeg"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImage(e.target.files[0]);
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
                  className="mt-2 max-w-full max-h-64 mxauto rounded-lg border border-gray-300 shadow-md object-contain"
                />

                <button
                  type="button"
                  onClick={() => {
                    setPreview(null);
                    setImage(null);
                    formik.setFieldValue("image", null);
                  }}
                  className="absolute top-4 right-2  p-2"
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
            className="w-full bg-amber-700 rounded-lg  hover:bg-amber-500 py-2"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateForm;
