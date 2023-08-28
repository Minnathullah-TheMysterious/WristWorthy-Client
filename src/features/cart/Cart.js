import React, { useEffect } from "react";
import { Select } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCartAsync } from "./cartSlice";

const Cart = ({ btnText, destination }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userCartItems = useSelector((state) => state.cart.items);
  console.log(userCartItems);

  const userId = user?.user?._id;

  useEffect(() => {
    dispatch(fetchUserCartAsync(userId));
  }, [dispatch, userId]);

  const calculatedSubTotal = userCartItems
    .flatMap((cart) => cart.items)
    .reduce(
      (total, item) => {
        total.totalPrice += item.price;
        total.totalItems += 1;
        return total;
      },
      { totalPrice: 0, totalItems: 0 }
    );

    const handleRemoveClick = (e, pId)=>{
      e.preventDefault()
      console.log(pId)
    }
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10 bg-white py-4">
        <h1 className="text-lg font-medium font-serif text-gray-900">
          Shopping cart
        </h1>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flow-root">
            <ul className="-my-6 divide-y divide-gray-200">
              {userCartItems?.map((userCart) =>
                userCart?.items.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product?.thumbnail}
                        alt={product?.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={product.href}>{product?.title}</a>
                          </h3>
                          <p className="ml-4">${product?.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {product?.color || "Color UnSpecified"}
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
                          <Select size="medium">
                            <Select.Option>1</Select.Option>
                            <Select.Option>2</Select.Option>
                            <Select.Option>3</Select.Option>
                          </Select>
                        </div>
                        <div className="flex">
                          <button
                          onClick={(e)=>{handleRemoveClick(e,product.id)}}
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${calculatedSubTotal.totalPrice}</p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <p>Total Items: {calculatedSubTotal.totalItems}</p>
          </div>

          <div className="mt-6">
            <Link
              to={destination}
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              {btnText}
            </Link>
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
