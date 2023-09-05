import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrdersAsync } from "../userSlice";

const UserOrders = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state?.auth?.user?._id);
  const orders = useSelector((state) => state?.user?.orders);
  console.log(orders);

  useEffect(() => {
    dispatch(fetchAllOrdersAsync(userId));
  }, [dispatch, userId]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10 bg-white py-4 space-y-12">
      {orders?.map((item) => (
        <div key={item?.id}>
          <h1 className="text-2xl font-bold font-serif text-gray-900 shadow-cyan-800 shadow  inline border-none py-1 px-4">
            Order Id: {item?.id}
          </h1>
          <p className="text-lg font-medium font-serif text-gray-900">
            Order Status:{" "}
            <span className="text-green-700">{item?.order?.status}</span>
          </p>

          <div className="bg-gray-200 border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flow-root">
              <ul className="-my-6 divide-y divide-gray-200">
                {item?.order?.items?.map((order) => (
                  <li key={order?.id} className="flex py-6">
                    {/* The Link is Not getting the product Id instead it is getting the cart-item Id. On server we will consider it */}
                    <Link to={`/product-details/${order?.product_id}`}>
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={order?.thumbnail}
                          alt={order?.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </Link>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          {/* The Link is Not getting the product Id instead it is getting the cart-item Id. On server we will consider it */}
                          <Link to={`/product-details/${order?.product_id}`}>
                            <h3 className="text-md text-blue-700 shadow-lg px-4 py-1">
                              {order?.title}
                            </h3>
                          </Link>
                          <p className="ml-4">${order?.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {order?.color || "Magenta"}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          Quantity:{" "}
                          <span className="font-bold">{order?.quantity}</span>
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Total Amount, Items and payment Method */}
          <div className="bg-gray-50 border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${item?.order?.totalAmount}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Total Items</p>
              <p>{item?.order?.totalItems}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Payment Method</p>
              <p>{item?.order?.selectedPaymentMethod}</p>
            </div>
          </div>

          {/* Shipping Address */}
          <ul className="bg-gray-200 border-t border-gray-200 px-4 py-6 sm:px-6">
            <li>
              <div className=" min-w-0 gap-x-4p-2">
                <h1 className="font-serif">Shipping Address</h1>
                <label className="flex justify-between gap-x-6 py-3">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {`${item?.order?.selectedUserAddress?.firstName} ${item?.order?.selectedUserAddress?.lastName}`}
                    </p>
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {item?.order?.selectedUserAddress?.city}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {item?.order?.selectedUserAddress?.mobileNumber}
                    </p>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      {item?.order?.selectedUserAddress?.village}
                    </p>
                    <p className="text-sm leading-6 text-gray-900">
                      {item?.order?.selectedUserAddress?.dist}
                    </p>
                    <p className="text-sm leading-6 text-gray-900">
                      {item?.order?.selectedUserAddress?.state}
                    </p>
                    <p className="text-sm leading-6 text-gray-900">
                      {item?.order?.selectedUserAddress?.pinCode}
                    </p>
                  </div>
                </label>
              </div>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default UserOrders;
