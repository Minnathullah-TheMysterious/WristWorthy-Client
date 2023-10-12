import React, { useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { deleteUserAddressAsync, updateUserAddressAsync } from "../userSlice";
import AddAddressForm from "./AddAddressForm";
import { Modal } from "antd";
import { FiAlertTriangle } from "react-icons/fi";

const ManageUserAddresses = () => {
  const dispatchAsync = useDispatch();
  const userAddresses = useSelector(
    (state) => state?.user?.userInfo?.addresses
  );
  const { confirm } = Modal;

  const [editingAddressIndex, setEditingAddressIndex] = useState(-1);
  const [isAddAddressEnabled, setIsAddAddressEnabled] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [altMobileNumber, setAltMobileNumber] = useState("");

  const initialState = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    country: "india",
    state: "",
    city: "",
    dist: "",
    village: "",
    mandal: "",
    street: "",
    pinCode: 506367,
  };

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

  const [userAddressData, dispatch] = useReducer(
    userAddressReducer,
    initialState
  );

  const handleFieldChange = (field, value) => {
    console.log(value);
    dispatch({ type: "UPDATE_FIELD", field, value });
  };

  const addressData = { ...userAddressData, mobileNumber, altMobileNumber };

  const handleDeleteAddress = (addressId) => {
    confirm({
      title: `Are you sure to delete this Address?`,
      icon: <FiAlertTriangle className="font-bold text-red-700 text-2xl" />,
      content: "Be Careful! The Address will be deleted permanently",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        try {
          dispatchAsync(deleteUserAddressAsync(addressId));
        } catch (error) {
          console.error(
            "Something Went Wrong while dispatching the delete-user-address action",
            error
          );
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleUpdateAddressClick = (e, addressId) => {
    console.log(addressData);
    e.preventDefault();
    const serializedAddressData = JSON.stringify(addressData);
    dispatchAsync(
      updateUserAddressAsync({
        addressId,
        addressData: serializedAddressData,
      })
    ).then(() => {
      setEditingAddressIndex(-1);
    });
  };

  const handleDiscardChangesClick = (e, index) => {
    e.preventDefault();
    handleEditAddressFormClick(index);
  };

  const handleEditAddressFormClick = (index) => {
    const addressToEdit = userAddresses[index];
    dispatch({
      type: "UPDATE_FIELD",
      field: "firstName",
      value: addressToEdit.firstName,
    });
    dispatch({
      type: "UPDATE_FIELD",
      field: "lastName",
      value: addressToEdit.lastName,
    });
    dispatch({
      type: "UPDATE_FIELD",
      field: "emailAddress",
      value: addressToEdit.emailAddress,
    });
    dispatch({
      type: "UPDATE_FIELD",
      field: "country",
      value: addressToEdit.country,
    });
    dispatch({
      type: "UPDATE_FIELD",
      field: "state",
      value: addressToEdit.state,
    });
    dispatch({
      type: "UPDATE_FIELD",
      field: "city",
      value: addressToEdit.city,
    });
    dispatch({
      type: "UPDATE_FIELD",
      field: "dist",
      value: addressToEdit.dist,
    });
    dispatch({
      type: "UPDATE_FIELD",
      field: "mandal",
      value: addressToEdit.mandal,
    });
    dispatch({
      type: "UPDATE_FIELD",
      field: "village",
      value: addressToEdit.village,
    });
    dispatch({
      type: "UPDATE_FIELD",
      field: "street",
      value: addressToEdit.street,
    });
    dispatch({
      type: "UPDATE_FIELD",
      field: "pinCode",
      value: addressToEdit.pinCode,
    });
    setMobileNumber(addressToEdit.mobileNumber);
    setAltMobileNumber(addressToEdit.altMobileNumber);
    setEditingAddressIndex(index);
  };

  const handleCloseClick = () => {
    setEditingAddressIndex(-1);
  };

  const handleAddAddressFormClick = (e) => {
    e.preventDefault();
    setIsAddAddressEnabled(true);
  };

  const handleCloseAddAddressFormClick = () => {
    setIsAddAddressEnabled(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8  py-5">
      <div className="my-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
        <div className="lg:col-span-5 sm:col-span-2  bg-gray-100">
          <form>
            {isAddAddressEnabled ? (
              <>
                <AddAddressForm
                  setIsAddAddressEnabled={setIsAddAddressEnabled}
                />
                <div
                  className="bg-sky-800 text-white py-2 px-4 rounded-lg hover:text-gray-300 font-serif text-center hover:cursor-pointer active:bg-sky-900 active:text-white"
                  onClick={handleCloseAddAddressFormClick}
                >
                  Close Form
                </div>
              </>
            ) : (
              <div>
                <div className="border-b border-gray-900/10">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-serif font-semibold leading-7 text-gray-900">
                        Addresses
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        All Your Addresses
                      </p>
                    </div>
                    <div
                      className="bg-green-800 text-white px-4 py-2 rounded-lg font-mono font-bold text-lg hover:cursor-pointer hover:bg-green-700 hover:text-gray-100 active:bg-green-800"
                      onClick={(e) => handleAddAddressFormClick(e)}
                    >
                      Add Address
                    </div>
                  </div>

                  {/* User Addresses Component */}
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4 bg-white py-4">
                    <ul className=" divide-y-8 divide-gray-300">
                      {userAddresses?.map((address, index) => (
                        <div className="space-y-5" key={address?._id}>
                          <li className="odd:bg-gray-200 px-6 even:bg-gray-50">
                            <div className=" min-w-0 gap-x-4p-2">
                              <label className="flex justify-between gap-x-6 py-3">
                                <div className="min-w-0 flex flex-col">
                                  <p className="text-sm font-semibold leading-6 text-gray-900">
                                    {`${address?.firstName} ${address?.lastName}`}
                                  </p>
                                  <p className="text-sm font-semibold leading-6 text-gray-900">
                                    {address?.city}
                                  </p>
                                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                    {address?.mobileNumber}
                                  </p>
                                </div>
                                <div className="hidden shrink-0 sm:flex sm:flex-col">
                                  <p className="text-sm leading-6 text-gray-900">
                                    {address?.village}
                                  </p>
                                  <p className="text-sm leading-6 text-gray-900">
                                    {address?.dist}
                                  </p>
                                  <p className="text-sm leading-6 text-gray-900">
                                    {address?.state}
                                  </p>
                                  <p className="text-sm leading-6 text-gray-900">
                                    {address?.pinCode}
                                  </p>
                                </div>
                                <div className="flex flex-shrink flex-col space-y-4">
                                  <div
                                    onClick={() =>
                                      handleEditAddressFormClick(index)
                                    }
                                    className=" bg-green-800 text-white font-serif font-medium px-4 py-1 rounded-lg active:text-gray-300 hover:bg-green-700 hover:cursor-pointer"
                                  >
                                    Edit
                                  </div>
                                  <div
                                    onClick={() =>
                                      handleDeleteAddress(address._id)
                                    }
                                    className="bg-red-800 text-white font-serif font-medium px-4 py-1 rounded-lg active:text-gray-300 hover:bg-red-700 hover:cursor-pointer"
                                  >
                                    Delete
                                  </div>
                                </div>
                              </label>
                            </div>
                          </li>
                          {/* Address Form */}
                          {editingAddressIndex === index && (
                            <div className="border-b border-gray-900/10">
                              <h2 className="mt-5 text-base font-semibold leading-7 text-gray-900">
                                Personal Information
                              </h2>
                              <p className="mt-1 text-sm leading-6 text-gray-600">
                                Use a permanent address where you can receive
                                mail.
                              </p>

                              <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                                        handleFieldChange(
                                          "firstName",
                                          e.target.value
                                        )
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
                                        handleFieldChange(
                                          "lastName",
                                          e.target.value
                                        )
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
                                        handleFieldChange(
                                          "emailAddress",
                                          e.target.value
                                        )
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
                                        handleFieldChange(
                                          "country",
                                          e.target.value
                                        )
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
                                        handleFieldChange(
                                          "street",
                                          e.target.value
                                        )
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
                                        handleFieldChange(
                                          "city",
                                          e.target.value
                                        )
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
                                        handleFieldChange(
                                          "state",
                                          e.target.value
                                        )
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
                                        handleFieldChange(
                                          "pinCode",
                                          e.target.value
                                        )
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
                                        handleFieldChange(
                                          "dist",
                                          e.target.value
                                        )
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
                                        handleFieldChange(
                                          "mandal",
                                          e.target.value
                                        )
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
                                        handleFieldChange(
                                          "village",
                                          e.target.value
                                        )
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
                              <div className="flex justify-end my-6 space-x-">
                                <button
                                  className="bg-sky-800 py-2 px-4 rounded-lg text-white font-serif"
                                  onClick={(e) =>
                                    handleUpdateAddressClick(e, address._id)
                                  }
                                >
                                  Update Address
                                </button>
                                <button
                                  className="hover:bg-red-800 hover:text-white py-2 px-4 rounded-lg text-black font-serif"
                                  onClick={(e) =>
                                    handleDiscardChangesClick(e, index)
                                  }
                                >
                                  Discard Changes
                                </button>
                                <button
                                  className="hover:bg-sky-800 hover:text-white py-2 px-4 rounded-lg text-black font-serif"
                                  onClick={(e) => handleCloseClick(e)}
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManageUserAddresses;
