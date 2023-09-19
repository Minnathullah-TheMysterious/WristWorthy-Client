import React, { useEffect } from "react";
import { Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMyUserCartItemAsync,
  fetchUserCartItemsAsync,
  updateMyCartItemQuantityAsync,
} from "./cartSlice";

const Cart = ({ btnText, destination }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userCart = useSelector((state) => state?.cart?.myItems);

  const userId = user?._id;

  useEffect(() => {
    dispatch(fetchUserCartItemsAsync(userId));
  }, [dispatch, userId]);

  const calculatedSubTotal = userCart?.items?.reduce(
    (total, item) => {
      total.totalPrice += item?.product?.price * item?.quantity;
      total.totalItems += item?.quantity;
      return total;
    },
    { totalPrice: 0, totalItems: 0 }
  );

  const totalAmount = calculatedSubTotal?.totalPrice;
  const totalItems = calculatedSubTotal?.totalItems;

  const handleRemoveClick = async (e, productId) => {
    e.preventDefault();
    console.log(userId, productId);
    const deleteItem = dispatch(
      deleteMyUserCartItemAsync({ userId, productId })
    );
    deleteItem
      .then(() => {
        if (userCart.items.length <= 1) {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error(
          "Something Went Wrong While removing the cart Item",
          error
        );
      });
  };

  const handleItemQuantityChange = async (quantity, productId) => {
    const actionResult = await dispatch(
      updateMyCartItemQuantityAsync({ userId, productId, quantity })
    );
    if (updateMyCartItemQuantityAsync.fulfilled.match(actionResult)) {
      dispatch(fetchUserCartItemsAsync(userId));
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
              {userCart?.items?.map((item) => (
                <li key={item?.product?._id} className="flex py-6">
                  {/* The Link is Not getting the product Id instead it is getting the cart-item Id. On server we will consider it */}
                  <Link to={`/product-details/${item?.product?._id}`}>
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 hover:opacity-80 active:opacity-100">
                      <img
                        src={`${process.env.REACT_APP_API}/${item?.product?.thumbnail?.location}`}
                        alt={item?.product?.product_name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </Link>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        {/* The Link is Not getting the product Id instead it is getting the cart-item Id. On server we will consider it */}
                        <Link to={`/product-details/${item?.product?._id}`}>
                          <h3 className="hover:text-gray-600 active:text-gray-900">
                            {item?.product?.product_name}
                          </h3>
                        </Link>
                        <p className="ml-4">${item?.product?.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {item?.product?.color || "Color UnSpecified"}
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
                          value={item?.quantity}
                          onChange={(value) => {
                            handleItemQuantityChange(value, item?.product?._id);
                          }}
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
                            handleRemoveClick(e, item?.product?._id);
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
