import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserAddressAsync } from "../userSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.userInfo);
  const userId = useSelector((state) => state?.auth?.user?._id);

  const handleDeleteAddress = (addressId) => {
    try {
      dispatch(deleteUserAddressAsync({ userId, addressId }));
    } catch (error) {
      console.error(
        "Something Went Wrong while dispatching the delete-user-address action",
        error
      );
    }
  };
  const handleEditAddress = () => {};

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10 bg-white py-4 space-y-12">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold font-serif text-gray-900 shadow-cyan-800 shadow  inline border-none py-1 px-4">
          User Name: {user?.user_name}
        </h1>
        <p className="text-lg font-medium font-serif text-gray-900">
          Email Id: <span className="text-green-700">{user?.email}</span>
        </p>
        <p className="text-lg font-medium font-serif text-gray-900">
          Phone Number: <span className="text-green-700">{user?.phone}</span>
        </p>
      </div>

      {/* User Addresses */}
      <div className="my-6">
        <h1 className="font-serif font-bold text-2xl">Addresses</h1>
        <ul>
          {user?.addresses?.map((address) => (
            <li key={address._id} className="odd:bg-gray-200 px-6">
              <div className=" min-w-0 gap-x-4p-2">
                <label className="flex justify-between py-6">
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
                  <div className="hidden sm:flex-shrink  sm:flex sm:flex-col">
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
                      onClick={handleEditAddress}
                      className=" bg-green-800 text-white font-serif font-medium px-4 py-1 rounded-lg active:text-gray-300 hover:bg-green-700 hover:cursor-pointer"
                    >
                      Edit
                    </div>
                    <div
                      onClick={() => handleDeleteAddress(address._id)}
                      className="bg-red-800 text-white font-serif font-medium px-4 py-1 rounded-lg active:text-gray-300 hover:bg-red-700 hover:cursor-pointer"
                    >
                      Delete
                    </div>
                  </div>
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
