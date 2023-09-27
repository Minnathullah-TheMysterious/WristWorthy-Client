import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFilteredOrdersAsync, getOrderDetailsAsync } from "../adminSlice";
import { BsPencilSquare, BsFillFileEarmarkLockFill } from "react-icons/bs";
import { AiFillEyeInvisible } from "react-icons/ai";
import { Select, Modal } from "antd";
import { updateOrderStatusAsync } from "../../user/userSlice";
import { Link } from "react-router-dom";
import { DISCOUNTED_PRICE } from "../../../app/constants";

const orderLimitPerPage = [
  { _id: 1, value: 5, label: 5 },
  { _id: 2, value: 10, label: 10 },
  { _id: 3, value: 20, label: 20 },
  { _id: 4, value: 50, label: 50 },
  { _id: 5, value: 100, label: 100 },
];

const orderStatusMessages = [
  { _id: 1, value: "", label: "All" },
  { _id: 2, value: "pending", label: "Pending" },
  { _id: 3, value: "shipped", label: "Shipped" },
  { _id: 4, value: "delayed", label: "Delayed" },
  { _id: 5, value: "cancelled", label: "Cancelled" },
  { _id: 6, value: "out-for -delivery", label: "Out For Delivery" },
  { _id: 7, value: "delivered", label: "Delivered" },
];

const AdminOrders = () => {
  const dispatch = useDispatch();
  const allOrders = useSelector((state) => state?.admin?.allOrders);
  const totalNumOfOrders = useSelector((state) => state?.admin?.ordersCount);
  const order = useSelector((state) => state?.admin?.orderDetails);
  const orderDetails = order && order[0];

  console.log(orderDetails);
  console.log(allOrders);

  const [pageLimit, setPageLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [queryOrderStatus, setQueryOrderStatus] = useState("");
  const [orderIdInput, setOrderIdInput] = useState("");
  const [input, setInput] = useState("");
  const [editableOrder, setEditableOrder] = useState("");
  const [open, setOpen] = useState(false);

  console.log(editableOrder);

  let ordersQueryString = "";
  if (queryOrderStatus === "" && orderIdInput === "") {
    ordersQueryString = `_page=${page}&_limit=${pageLimit}`;
  }
  if (queryOrderStatus !== "" && orderIdInput === "") {
    ordersQueryString = `_page=${page}&_limit=${pageLimit}&order_status=${queryOrderStatus}`;
  }
  if (queryOrderStatus === "" && orderIdInput !== "") {
    ordersQueryString = `_page=${page}&_limit=${pageLimit}&order_id=${orderIdInput}`;
  }
  if (queryOrderStatus !== "" && orderIdInput !== "") {
    ordersQueryString = `_page=${page}&_limit=${pageLimit}&order_id=${orderIdInput}&order_status=${queryOrderStatus}`;
  }
  console.log(ordersQueryString);

  useEffect(() => {
    dispatch(getAllFilteredOrdersAsync(ordersQueryString));
  }, [dispatch, ordersQueryString]);

  console.log(allOrders);

  const handleStatusChange = async (orderStatus, userId, orderId) => {
    console.log(orderStatus);
    console.log(userId);
    console.log(orderId);
    dispatch(updateOrderStatusAsync({ userId, orderId, orderStatus })).then(
      () => {
        setEditableOrder("");
        dispatch(getAllFilteredOrdersAsync(ordersQueryString));
      }
    );
  };

  const handleOrderDetails = (orderId) => {
    setOpen(true);
    dispatch(getOrderDetailsAsync(orderId));
  };

  const chooseStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-800";
      case "shipped":
        return "bg-sky-800";
      case "cancelled":
        return "bg-red-600";
      case "delivered":
        return "bg-green-800";
      case "delayed":
        return "bg-yellow-500";
      default:
        return "bg-gray-800";
    }
  };

  return (
    <>
      {/* component */}
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">Orders</h2>
          </div>
          {/* Filters & Page limit handling */}
          <div className="my-2 flex sm:flex-row flex-col">
            <div className="flex flex-row mb-1 sm:mb-0">
              <div className="relative">
                <select
                  defaultValue={5}
                  onChange={(e) => setPageLimit(e.target.value)}
                  className="appearance-none h-full rounded-l border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  {orderLimitPerPage.map((limit) => (
                    <option key={limit._id} value={limit.value}>
                      {limit.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <div className="relative">
                <select
                  defaultValue={""}
                  onChange={(e) => setQueryOrderStatus(e.target.value)}
                  className="h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                >
                  {orderStatusMessages.map((status) => (
                    <option key={status._id} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="block relative">
              <span
                onClick={() => {
                  setOrderIdInput(input);
                  setPage(1);
                }}
                className="h-full absolute inset-y-0 left-0 flex items-center pl-2 hover:cursor-pointer"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current text-gray-500 hover:scale-105 active:scale-100"
                >
                  <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                </svg>
              </span>
              <input
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search Order Id"
                className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
              />
            </div>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      ORDER ID
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      ITEM
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      TOTAL AMOUNT
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      SHIPPING ADDRESS
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      STATUS
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allOrders?.map((orders) =>
                    orders?.order?.map((order) => (
                      <tr key={order?._id}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm  font-semibold">
                          <div className="ml-3">
                            <p className="text-gray-900">{order._id}</p>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-semibold">
                          {order?.products?.map((product) => (
                            <div
                              key={product?.product_id}
                              className="flex justify-start"
                            >
                              <div className="">
                                <img
                                  src={`${process.env.REACT_APP_API}/${product?.thumbnail?.location}`}
                                  alt={product.product_name}
                                  className="my-2 md:w-32 sm:block hidden"
                                />
                              </div>
                              <div className="flex flex-col justify-center items-center mx-2">
                                <div className="text-blue-900">
                                  <span>#{product?.quantity} - </span>
                                  <span>${DISCOUNTED_PRICE(product)}</span>
                                </div>
                                <p className="text-blue-900">
                                  {product?.product_name}
                                </p>
                              </div>
                            </div>
                          ))}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white">
                          <p className="relative text-gray-900 font-bold">
                            ${order?.totalAmount}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="relative px-3 py-1 font-semibold text-green-900 leading-tight">
                            {order?.shippingAddress?.city},
                          </div>
                          <div className="relative px-3 py-1 font-semibold text-green-900 leading-tight">
                            {order?.shippingAddress?.state},
                          </div>
                          <div className="relative px-3 py-1 font-semibold text-green-900 leading-tight">
                            {order?.shippingAddress?.country},
                          </div>
                          <div className="relative px-3 py-1 font-semibold text-green-900 leading-tight">
                            {order?.shippingAddress?.pinCode}
                          </div>
                        </td>
                        {order?._id !== editableOrder ? (
                          <td className="px-5 py-5 border-b border-gray-200 bg-white">
                            <p
                              className={` flex justify-center items-center text-white px-2 py-1 rounded-lg font-semibold ${chooseStatusColor(
                                order?.status
                              )}`}
                            >
                              {order?.status}
                            </p>
                          </td>
                        ) : (
                          <td className="px-5 py-5 border-b border-gray-200 bg-white">
                            <Select
                              className="w-32"
                              value={order?.status}
                              onChange={(value) =>
                                handleStatusChange(
                                  value,
                                  orders?.user,
                                  order?._id
                                )
                              }
                            >
                              {orderStatusMessages.map((status) => (
                                <Select.Option
                                  key={status._id}
                                  value={status.value}
                                >
                                  {status.label}
                                </Select.Option>
                              ))}
                            </Select>
                          </td>
                        )}
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex justify-around">
                            {order?._id !== editableOrder ? (
                              <BsPencilSquare
                                onClick={() => setEditableOrder(order?._id)}
                                className="h-6 w-6 hover:cursor-pointer text-green-600 hover:text-blue-600 active:text-blue-900"
                              />
                            ) : (
                              <AiFillEyeInvisible
                                onClick={() => setEditableOrder("")}
                                className="h-6 w-6 hover:cursor-pointer text-green-600 hover:text-blue-600 active:text-blue-900"
                              />
                            )}
                            <BsFillFileEarmarkLockFill
                              onClick={() => handleOrderDetails(order?._id)}
                              className="h-6 w-6 hover:cursor-pointer text-gray-600 hover:text-blue-600 active:text-blue-900"
                            />
                            {/* Modal for showing more order details */}
                            <Modal
                              centered
                              open={open}
                              onOk={() => setOpen(false)}
                              onCancel={() => setOpen(false)}
                              okText={""}
                              cancelText={""}
                              width={1000}
                            >
                              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10 bg-white py-4 space-y-12">
                                {orderDetails?.order?.map((orderDetail) => (
                                  <div>
                                    <h1 className="text-2xl font-bold font-serif text-gray-900 shadow-cyan-800 shadow  inline border-none py-1 px-4">
                                      Order Id: {orderDetail?._id}
                                    </h1>
                                    <p className="text-lg font-medium font-serif text-gray-900">
                                      Order Status:{" "}
                                      <span className="text-green-700">
                                        {orderDetail?.status}
                                      </span>
                                    </p>

                                    <div className="bg-gray-200 border-t border-gray-200 px-4 py-6 sm:px-6">
                                      <div className="flow-root">
                                        <ul className="-my-6 divide-y divide-gray-200">
                                          {orderDetail?.products?.map(
                                            (product) => (
                                              <li
                                                key={product.product_id}
                                                className="flex py-6"
                                              >
                                                <Link
                                                  to={`/product-details/${product?.product_id}`}
                                                >
                                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 hover:opacity-80 active:opacity-100">
                                                    <img
                                                      src={`${process.env.REACT_APP_API}/${product?.thumbnail?.location}`}
                                                      alt={
                                                        product?.product_name
                                                      }
                                                      className="h-full w-full object-cover object-center"
                                                    />
                                                  </div>
                                                </Link>

                                                <div className="ml-4 flex flex-1 flex-col">
                                                  <div>
                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                      <Link
                                                        to={`/product-details/${product?.product_id}`}
                                                      >
                                                        <h3 className="text-md text-blue-700 shadow-md px-4 py-1 hover:shadow active:shadow-md">
                                                          {
                                                            product?.product_name
                                                          }
                                                        </h3>
                                                      </Link>
                                                      <p className="ml-4">
                                                        ${DISCOUNTED_PRICE(product)}
                                                      </p>
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-500">
                                                      Quantity:{" "}
                                                      <span className="font-bold">
                                                        {product?.quantity}
                                                      </span>
                                                    </p>
                                                  </div>
                                                </div>
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      </div>
                                    </div>

                                    {/* Total Amount, Items and payment Method */}
                                    <div className="bg-gray-50 border-t border-gray-200 px-4 py-6 sm:px-6">
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p>Subtotal</p>
                                        <p>${orderDetail?.totalAmount}</p>
                                      </div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p>Total Items</p>
                                        <p>{orderDetail?.totalItems}</p>
                                      </div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p>Payment Method</p>
                                        <p>{orderDetail?.paymentMethod}</p>
                                      </div>
                                    </div>

                                    {/* Shipping Address */}
                                    <ul className="bg-gray-200 border-t border-gray-200 px-4 py-6 sm:px-6">
                                      <li>
                                        <div className=" min-w-0 gap-x-4p-2">
                                          <h1 className="font-serif">
                                            Shipping Address
                                          </h1>
                                          <label className="flex justify-between gap-x-6 py-3">
                                            <div className="min-w-0 flex-auto">
                                              <p className="text-sm font-semibold leading-6 text-gray-900">
                                                {`${orderDetail?.shippingAddress?.firstName} ${orderDetail?.shippingAddress?.lastName}`}
                                              </p>
                                              <p className="text-sm font-semibold leading-6 text-gray-900">
                                                {
                                                  orderDetail?.shippingAddress
                                                    ?.city
                                                }
                                              </p>
                                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                {
                                                  orderDetail?.shippingAddress
                                                    ?.mobileNumber
                                                }
                                              </p>
                                            </div>
                                            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                              <p className="text-sm leading-6 text-gray-900">
                                                {
                                                  orderDetail?.shippingAddress
                                                    ?.village
                                                }
                                              </p>
                                              <p className="text-sm leading-6 text-gray-900">
                                                {
                                                  orderDetail?.shippingAddress
                                                    ?.dist
                                                }
                                              </p>
                                              <p className="text-sm leading-6 text-gray-900">
                                                {
                                                  orderDetail?.shippingAddress
                                                    ?.state
                                                }
                                              </p>
                                              <p className="text-sm leading-6 text-gray-900">
                                                {
                                                  orderDetail?.shippingAddress
                                                    ?.pinCode
                                                }
                                              </p>
                                            </div>
                                          </label>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </Modal>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              {/* Pagination */}
              <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                <span className="text-xs xs:text-sm text-gray-900">
                  Showing {(page - 1) * pageLimit + 1} to{" "}
                  {page * pageLimit > totalNumOfOrders
                    ? totalNumOfOrders
                    : page * pageLimit}{" "}
                  of {totalNumOfOrders} Orders
                </span>
                <div className="inline-flex mt-2 xs:mt-0">
                  <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
                  >
                    Prev
                  </button>
                  <button
                    onClick={() => setPage(page + 1)}
                    className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
                    disabled={
                      Math.ceil(totalNumOfOrders / page) <= pageLimit
                        ? true
                        : false
                    }
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminOrders;
