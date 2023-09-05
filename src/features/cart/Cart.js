import React from "react";
import { Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserCartItemAsync,
  fetchUserCartAsync,
  updateCartItemQuantityAsync,
} from "./cartSlice";
import toast from "react-hot-toast";

const Cart = ({ btnText, destination }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userCartItems = useSelector((state) => state.cart.items);

  const userId = user?._id;

  const calculatedSubTotal = userCartItems?.reduce(
    (total, item) => {
      total.totalPrice += item?.price * item?.quantity;
      total.totalItems += item?.quantity;
      return total;
    },
    { totalPrice: 0, totalItems: 0 }
  );

  const totalAmount = calculatedSubTotal?.totalPrice;
  const totalItems = calculatedSubTotal?.totalItems;

  const handleRemoveClick = async (e, cartItemId) => {
    e.preventDefault();
    const deleteItem = dispatch(deleteUserCartItemAsync(cartItemId));
    deleteItem
      .then(() => {
        toast.success("Item Removed Successfully");
        console.log(userCartItems.length);
        if (userCartItems.length <= 1) {
          navigate("/");
        }
      })
      .catch((error) => {
        toast("Failed To Remove The Item", {
          className: "font-serif bg-blue-900 text-white",
        });
        console.error('Something Went Wrong While removing the cart Item', error)
      });
  };

  const handleItemQuantityChange = async (value, product) => {
    console.log(value);
    const actionResult = await dispatch(
      updateCartItemQuantityAsync({ ...product, quantity: value })
    );
    if (updateCartItemQuantityAsync.fulfilled.match(actionResult)) {
      dispatch(fetchUserCartAsync(userId));
    }
  };
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10 bg-white py-4">
        <h1 className="text-lg font-medium font-serif text-gray-900">
          Shopping cart
        </h1>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flow-root">
            <ul className="-my-6 divide-y divide-gray-200">
              {userCartItems?.map((item) => (
                <li key={item?.id} className="flex py-6">
                  {/* The Link is Not getting the product Id instead it is getting the cart-item Id. On server we will consider it */}
                  <Link to={`/product-details/${item?.product_id}`}>
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item?.thumbnail}
                        alt={item?.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </Link>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        {/* The Link is Not getting the product Id instead it is getting the cart-item Id. On server we will consider it */}
                        <Link to={`/product-details/${item?.product_id}`}>
                          <h3>{item?.title}</h3>
                        </Link>
                        <p className="ml-4">${item?.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {item?.color || "Color UnSpecified"}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-gray-500">
                        <label
                          htmlFor="quantity"
                          className="inline mr-2 text-sm font-medium leading-6 text-gray-900"
                        >
                          Qty
                        </label>
                        <Select
                          size="medium"
                          onChange={(value) => {
                            handleItemQuantityChange(value, item);
                          }}
                          value={item?.quantity}
                        >
                          <Select.Option value={1}>1</Select.Option>
                          <Select.Option value={2}>2</Select.Option>
                          <Select.Option value={3}>3</Select.Option>
                          <Select.Option value={4}>4</Select.Option>
                          <Select.Option value={5}>5</Select.Option>
                          <Select.Option value={6}>6</Select.Option>
                          <Select.Option value={7}>7</Select.Option>
                          <Select.Option value={8}>8</Select.Option>
                          <Select.Option value={9}>9</Select.Option>
                          <Select.Option value={10}>10</Select.Option>
                        </Select>
                      </div>
                      <div className="flex">
                        <button
                          onClick={(e) => {
                            handleRemoveClick(e, item?.id);
                          }}
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${totalAmount}</p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Total Items</p>
            <p>{totalItems}</p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
          </div>

          <div className="mt-6">
            <div
              onClick={destination}
              className="cursor-pointer flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              {btnText}
            </div>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <Link to={"/"}>
              <p>
                or
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
