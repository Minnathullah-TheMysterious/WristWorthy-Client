import React from "react";
import { useSelector } from "react-redux";

const UserAddresses = () => {
  const userAddresses = useSelector((state) => state?.auth?.user?.addresses);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10 bg-white py-4">
      <ul className="divide-y divide-gray-100">
        {userAddresses?.map((user) => (
          <li key={user?._id} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <input
                id="cash"
                name="address"
                type="radio"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {`${user?.firstName} ${user?.lastName}`}
                </p>
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {user.city}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {user.mobileNumber}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{user.village}</p>
              <p className="text-sm leading-6 text-gray-900">{user.dist}</p>
              <p className="text-sm leading-6 text-gray-900">{user.state}</p>
              <p className="text-sm leading-6 text-gray-900">{user.pinCode}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserAddresses;
