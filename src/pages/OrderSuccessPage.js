import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const OrderSuccessPage = () => {
  const orderId = useSelector((state) => state?.user?.currentOrder?._id);

  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl text-green-800">
          Order Successfully Placed
        </h1>
        <p className="mt-6 leading-7 font-sans font-bold">
          Your Order ID:{" "}
          <span className="text-xl text-blue-800">{orderId}</span>
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/dashboard/user/orders"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go To My Orders
          </Link>
          <Link to="/" className="text-sm font-semibold text-gray-900">
            Go To Home <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default OrderSuccessPage;
