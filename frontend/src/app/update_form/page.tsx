import React from "react";

const UpdateForm = () => {
  return (
    <div className="bg-opacity w-[350] ">
      <form action="" className="space-y-4 p-6 bg-amber-50 rounded-2xl">
        <div>
          <label className="block mb-1 font-medium">Amount:</label>
          <input
            type="number"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Amount"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Optional notes..."
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Date:</label>
          <input
            type="date"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Time:</label>
          <input
            type="time"
            className="w-full p-2 mb-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-amber-700 rounded-lg hover:bg-amber-500 py-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateForm;
