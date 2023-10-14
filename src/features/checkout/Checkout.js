import React, { useState } from "react";
import UserAddresses from "../user/components/UserAddresses";
import Cart from "../cart/Cart";
import { useDispatch, useSelector } from "react-redux";

import { mySetSelectedUserAddress, placeOrderAsync } from "../user/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AddAddressForm from "../user/components/AddAddressForm";
import { DISCOUNTED_PRICE } from "./../../app/constants";
import { updateProductStockSlice } from "../products/productSlice";
import { resetCartAsync } from "../cart/cartSlice";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state?.cart?.items);
  const selectedUserAddress = useSelector(
    (state) => state?.user?.selectedUserAddress
  );

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cash");
  const [, setIsAddAddressEnabled] = useState();

  const handlePaymentMethod = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const totalAmount = cartItems?.items?.reduce(
    (total, items) =>
      total + DISCOUNTED_PRICE(items?.product) * items?.quantity,
    0
  );

  const totalItems = cartItems?.items?.reduce(
    (total, items) => total + items?.quantity,
    0
  );

  const products = cartItems?.items?.map((item) => ({
    product_id: item?.product?._id,
    quantity: item?.quantity,
  }));
  //an array of products with product _id and its quantity

  const handlePlaceOrderClick = (e) => {
    e.preventDefault();
    try {
      if (!selectedUserAddress) {
        return toast("Please Choose An Address For Shipping", {
          className: "font-serif bg-blue-900 text-white",
        });
      } else if (!cartItems?.items?.length) {
        return toast("Your Cart Is Empty, Please Add Items To Place Order", {
          className: "font-serif bg-blue-900 text-white",
        });
      }

      dispatch(
        placeOrderAsync({
          products,
          totalItems,
          totalAmount,
          selectedUserAddress,
          selectedPaymentMethod,
        })
      )
        .then(async () => {
          if (selectedPaymentMethod === "cash") {
            products?.forEach((product) =>
              dispatch(
                updateProductStockSlice({
                  productId: product?.product_id,
                  productQuantity: product?.quantity,
                })
              )
            );
            dispatch(mySetSelectedUserAddress(null));
            dispatch(resetCartAsync());
            return navigate(`/dashboard/user/cash-payment-order-success`);
          } else if (selectedPaymentMethod === "card") {
            products?.forEach((product) =>
              dispatch(
                updateProductStockSlice({
                  productId: product?.product_id,
                  productQuantity: product?.quantity,
                })
              )
            );
            return navigate("/dashboard/user/stripe-checkout");
          }
        })
        .catch(() => {
          navigate("/dashboard/user/cart");
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8  py-5">
      <div className="my-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
        <div className="lg:col-span-3  bg-gray-100">
          <form>
            <div className="space-y-12">
              {/*Add Address Form */}
              <AddAddressForm setIsAddAddressEnabled={setIsAddAddressEnabled} />
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Address
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Choose From Existing Address
                </p>
                {/* User Addresses Component */}
                <UserAddresses />

                <div className="mt-10 space-y-10">
                  <fieldset>
                    <legend className="text-sm font-semibold leading-6 text-gray-900">
                      Payment Methods
                    </legend>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Choose One
                    </p>
                    <div className="mt-6 space-y-6">
                      <div className="flex items-center gap-x-3">
                        <input
                          id="cash"
                          value={"cash"}
                          checked={selectedPaymentMethod === "cash"}
                          name="payment-methods"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          onChange={handlePaymentMethod}
                        />
                        <label
                          htmlFor="cash"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Cash On Delivery
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          id="card"
                          value={"card"}
                          name="payment-methods"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          onChange={handlePaymentMethod}
                        />
                        <label
                          htmlFor="card"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Credit/Debit Card
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="lg:col-span-2 ">
          {/* Cart Component */}
          <Cart
            btnText={"Place Order"}
            destination={(e) => {
              handlePlaceOrderClick(e);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
