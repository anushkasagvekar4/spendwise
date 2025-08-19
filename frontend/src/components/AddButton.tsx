import React from "react";
import Link from "next/link";
import { MdAddCircle } from "react-icons/md";

const AddButton = () => {
  return (
    <div className="">
      <Link href={"/add_expense"}>
        <MdAddCircle size={40} className="text-amber-600" />
      </Link>
    </div>
  );
};

export default AddButton;
