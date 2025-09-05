import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm p-8 bg-amber-50 rounded-2xl shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-6 text-amber-700">
          Access Denied
        </h2>
        <p className="text-grey-50 mb-6">You need to login to continue.</p>
        <Link
          href="/auth/login"
          className="block w-full bg-amber-700 text-white py-2 rounded-lg hover:bg-amber-600 transition"
        >
          Click here to login
        </Link>
      </div>
    </div>
  );
};

export default Login;
