import React, { useReducer, useState } from "react";
import UserAddresses from "../user/components/UserAddresses";
import Cart from "../cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { addUserAddressAsync } from "../auth/authSlice";
import { useNavigate } from "react-router-dom";
import { placeOrderAsync } from "../user/userSlice";
import toast from "react-hot-toast";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatchAsync = useDispatch();
  const user = useSelector((state) => state?.auth?.user);
  const cartItems = useSelector((state) => state?.cart?.items);
  const selectedUserAddress = useSelector(
    (state) => state?.auth?.selectedUserAddress
  );

  const [mobileNumber, setMobileNumber] = useState("");
  const [altMobileNumber, setAltMobileNumber] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cash");

  const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
  const token = userFromLocalStorage?.token;
  const userId = user?._id;

  const userAddressReducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_FIELD":
        return { ...state, [action.field]: action.value };
      case "UPDATE_FORM":
        return initialState;
      default:
        return state;
    }
  };

  const initialState = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    country: "",
    state: "",
    city: "",
    dist: "",
    village: "",
    mandal: "",
    street: "",
    pinCode: 0,
  };

  const [userAddressData, dispatch] = useReducer(
    userAddressReducer,
    initialState
  );

  const handleFieldChange = (field, value) => {
    dispatch({ type: "UPDATE_FIELD", field, value });
  };

  const addressData = { ...userAddressData, mobileNumber, altMobileNumber };

  const handleAddAddressClick = async (e) => {
    e.preventDefault();
    try {
      dispatchAsync(addUserAddressAsync({ addressData, userId, token }));
    } catch (error) {
      console.error(
        "Something Went Wrong in dispatching the add-user-address",
        error
      );
    }
  };

  const handleResetFormClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_FORM" });
    setMobileNumber("");
    setAltMobileNumber("");
  };

  const handlePaymentMethod = (e) => {
    console.log(e.target.value);
    setSelectedPaymentMethod(e.target.value);
  };

  const totalAmount = cartItems?.reduce(
    (total, items) => total + items?.price * items?.quantity,
    0
  );

  const totalItems = cartItems?.reduce(
    (total, items) => total + items?.quantity,
    0
  );

  const order = {
    items: cartItems,
    user,
    totalItems,
    totalAmount,
    selectedUserAddress,
    selectedPaymentMethod,
    status: "Pending", //other status can be delivered, shipped, received. will be managed by the seller
  };

  const handlePlaceOrderClick = (e) => {
    e.preventDefault();
    try {
      if (!selectedUserAddress) {
        return toast("Please Choose An Address For Shipping", {
          className: "font-serif bg-blue-900 text-white",
        });
      } else if (!cartItems.length) {
        return toast("Your Cart Is Empty, Please Add Items To Place Order", {
          className: "font-serif bg-blue-900 text-white",
        });
      } else {
        dispatchAsync(placeOrderAsync({ userId, order }))
          .then(() => {
            navigate("/dashboard/order-success");
            //server: change in stock items
          })
          .catch(() => {
            navigate("/dashboard/cart");
          });
      }
    } catch (error) {
      console.error(
        "Something Went Wrong in dispatching the place-order",
        error
      );
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8  py-5">
      <div className="my-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
        <div className="lg:col-span-3  bg-gray-100">
          <form>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      First name
                    </label>
                    <div className="mt-2">
                      <input
                        onChange={(e) =>
                          handleFieldChange("firstName", e.target.value)
                        }
                        value={userAddressData.firstName}
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Last name
                    </label>
                    <div className="mt-2">
                      <input
                        onChange={(e) =>
                          handleFieldChange("lastName", e.target.value)
                        }
                        value={userAddressData.lastName}
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        onChange={(e) =>
                          handleFieldChange("emailAddress", e.target.value)
                        }
                        value={userAddressData.emailAddress}
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="mob-number"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Mobile Number
                    </label>
                    <div className="mt-2">
                      <PhoneInput
                        id="mob-number"
                        name="mob-number"
                        type="tel"
                        autoComplete="phone"
                        required
                        onChange={setMobileNumber}
                        value={mobileNumber}
                        defaultCountry="IN"
                        className="w-full rounded-md border-0 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="alt-number"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Alternate Number
                    </label>
                    <div className="mt-2">
                      <PhoneInput
                        id="alt-number"
                        name="alt-number"
                        type="tel"
                        autoComplete="phone"
                        required
                        onChange={setAltMobileNumber}
                        value={altMobileNumber}
                        defaultCountry="IN"
                        className="w-full rounded-md border-0 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Country
                    </label>
                    <div className="mt-2">
                      <select
                        onChange={(e) =>
                          handleFieldChange("country", e.target.value)
                        }
                        value={userAddressData.country}
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option value={"india"}>India</option>
                        <option value={"nepal"}>Nepal</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Street address
                    </label>
                    <div className="mt-2">
                      <input
                        onChange={(e) =>
                          handleFieldChange("street", e.target.value)
                        }
                        value={userAddressData.street}
                        type="text"
                        name="street-address"
                        id="street-address"
                        autoComplete="street-address"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        onChange={(e) =>
                          handleFieldChange("city", e.target.value)
                        }
                        value={userAddressData.city}
                        type="text"
                        name="city"
                        id="city"
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="region"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      State / Province
                    </label>
                    <div className="mt-2">
                      <input
                        onChange={(e) =>
                          handleFieldChange("state", e.target.value)
                        }
                        value={userAddressData.state}
                        type="text"
                        name="region"
                        id="region"
                        autoComplete="address-level1"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      ZIP / Postal code
                    </label>
                    <div className="mt-2">
                      <input
                        onChange={(e) =>
                          handleFieldChange("pinCode", e.target.value)
                        }
                        value={userAddressData.pinCode}
                        type="text"
                        name="postal-code"
                        id="postal-code"
                        autoComplete="postal-code"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="dist"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      District
                    </label>
                    <div className="mt-2">
                      <input
                        onChange={(e) =>
                          handleFieldChange("dist", e.target.value)
                        }
                        value={userAddressData.dist}
                        type="text"
                        name="dist"
                        id="dist"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="town"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Town / Mandal
                    </label>
                    <div className="mt-2">
                      <input
                        onChange={(e) =>
                          handleFieldChange("mandal", e.target.value)
                        }
                        value={userAddressData.mandal}
                        type="text"
                        name="town"
                        id="town"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="village"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Village
                    </label>
                    <div className="mt-2">
                      <input
                        onChange={(e) =>
                          handleFieldChange("village", e.target.value)
                        }
                        value={userAddressData.village}
                        type="text"
                        name="village"
                        id="village"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-6 space-x-6">
                  <button
                    className="bg-sky-800 py-2 px-4 rounded-lg text-white font-serif"
                    onClick={(e) => handleAddAddressClick(e)}
                  >
                    Add Address
                  </button>
                  <button
                    className="hover:bg-sky-800 hover:text-white py-2 px-4 rounded-lg text-black font-serif border-sky-800 "
                    onClick={(e) => handleResetFormClick(e)}
                  >
                    Reset Form
                  </button>
                </div>
              </div>

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

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
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
