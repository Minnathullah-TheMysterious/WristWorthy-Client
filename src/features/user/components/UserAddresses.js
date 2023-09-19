import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { mySetSelectedUserAddress } from "../../user/userSlice";

const UserAddresses = () => {
  const dispatch = useDispatch();
  const userAddresses = useSelector(
    (state) => state?.user?.userInfo?.addresses
  );

  const handleSelectedAddressChange = (e) => {
    try {
      const selectedAddressIndex = e?.target?.value;
      dispatch(
        mySetSelectedUserAddress(
          userAddresses && userAddresses[selectedAddressIndex]
        )
      );
    } catch (error) {
      console.error(
        "Something Went Wrong while dispatching the user-selected-address",
        error
      );
    }
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10 bg-white py-4">
        <ul className=" divide-y-8 divide-gray-300">
          {userAddresses?.map((user, index) => (
            <li key={user?._id}>
              <div className=" min-w-0 gap-x-4p-2">
                <label
                  htmlFor="cash"
                  className="flex justify-between gap-x-6 py-3"
                >
                  <div className="min-w-0 flex-auto">
                    <input
                      onChange={handleSelectedAddressChange}
                      value={index}
                      id="cash"
                      name="address"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 "
                    />
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {`${user?.firstName} ${user?.lastName}`}
                    </p>
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {user?.city}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {user?.mobileNumber}
                    </p>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      {user?.village}
                    </p>
                    <p className="text-sm leading-6 text-gray-900">
                      {user?.dist}
                    </p>
                    <p className="text-sm leading-6 text-gray-900">
                      {user?.state}
                    </p>
                    <p className="text-sm leading-6 text-gray-900">
                      {user?.pinCode}
                    </p>
                  </div>
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default UserAddresses;
