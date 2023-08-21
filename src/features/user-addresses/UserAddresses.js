import React from "react";

const address = [
  {
    id: 1,
    name: "Minnathullah",
    street: "Royal Function Hall",
    village: "Maddur",
    dist: "Siddipet",
    city: "Hyd",
    pincode: 506367,
    state: "Telangana",
    phone: "+916281089096",
  },
  {
    id: 2,
    name: "Rehan",
    street: "Telang Mahal",
    village: "Maddur",
    dist: "Warangal",
    city: "New Delhi",
    pincode: 526871,
    state: "Delhi",
    phone: "+916281089095",
  },
  {
    id: 3,
    name: "Arbaz",
    street: "Royal Function ghat",
    village: "Daddur",
    dist: "Siddipeeth",
    city: "Madras",
    pincode: 506367,
    state: "Kar-Natak",
    phone: "+916281089796",
  },
];
const UserAddresses = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10 bg-white py-4">
      <ul role="list" className="divide-y divide-gray-100">
        {address.map((user) => (
          <li key={user.id} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <input
                id="cash"
                name="address"
                type="radio"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {user.name}
                </p>
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {user.city}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {user.phone}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{user.village}</p>
              <p className="text-sm leading-6 text-gray-900">{user.dist}</p>
              <p className="text-sm leading-6 text-gray-900">{user.state}</p>
              <p className="text-sm leading-6 text-gray-900">{user.pincode}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserAddresses;
