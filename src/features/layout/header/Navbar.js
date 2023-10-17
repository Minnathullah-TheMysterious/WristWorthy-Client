import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BsSearch } from "react-icons/bs";
import { Input, Badge, Button } from "antd";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { logoutAsync } from "../../auth/authSlice";
import { searchProductsAsync } from "../../products/productSlice";

// const navigation = [{ name: "Home", href: "/", current: false }];

const userNavigation = [
  { id: 1, name: "My Profile", href: "/dashboard/user/profile" },
  { id: 2, name: "My Orders", href: "/dashboard/user/orders" },
  { id: 3, name: "My Wishlist", href: "/dashboard/user/wishlist" },
  { id: 4, name: "Manage Addresses", href: "/dashboard/user/addresses" },
];

const adminNavigation = [
  { id: 1, name: "Categories", href: "/dashboard/admin/categories" },
  { id: 2, name: "Products", href: "/dashboard/admin/products" },
  { id: 3, name: "Brands", href: "/dashboard/admin/brands" },
  { id: 4, name: "Orders", href: "/dashboard/admin/orders" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.userInfo);
  const cart = useSelector((state) => state?.cart?.items);

  const [searchValue, setSearchValue] = useState("");

  const handleLogout = () => {
    dispatch(logoutAsync())
      .then(() => {
        navigate("/login");
        window.location.reload();
      })
      .catch(() => navigate("/"));
  };

  const handleProductSearchClick = () => {
    dispatch(searchProductsAsync(searchValue));
  };

  return (
    <>
      <div className="sticky top-0 z-50 shadow-gray-400 shadow-lg">
        <div className="min-h-full font-serif">
          <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Link to={"/"}>
                          <img
                            className="w-16"
                            src="/images/logo256.png"
                            alt="WristWorthy"
                          />
                        </Link>
                      </div>

                      <div className="ml-10 items-baseline hidden md:block lg:w-[500px] w-80">
                        <Input
                          type="text"
                          size="large"
                          placeholder="Search Products"
                          onChange={(e) => setSearchValue(e.target.value)}
                          prefix={
                            <BsSearch
                              onClick={() => handleProductSearchClick()}
                              className="cursor-pointer text-blue-500 hover:text-red-600 active:text-blue-600 text-xl"
                            />
                          }
                        />
                      </div>
                    </div>
                    <div className="hidden md:block">
                      {/* Cart (Laptop) */}
                      <div className="ml-4 flex items-center md:ml-6 md:space-x-6">
                        {user?.role === "user" && cart?.items?.length ? (
                          <Link to={"/dashboard/user/cart"}>
                            <button
                              type="button"
                              className=" rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                              <span className="sr-only">
                                View notifications
                              </span>
                              <Badge count={user ? cart?.items?.length : null}>
                                <div className="flex space-x-1 text-gray-300">
                                  <div className="text-base">Cart</div>
                                  <div>
                                    <ShoppingCartIcon
                                      className="h-6 w-6"
                                      aria-hidden="true"
                                    />
                                  </div>
                                </div>
                              </Badge>
                            </button>
                          </Link>
                        ) : user?.role === "user" && !cart?.items?.length ? (
                          <button
                            type="button"
                            className=" rounded-full bg-gray-800 p-1 text-gray-400  hover:cursor-default"
                          >
                            <span className="sr-only">View notifications</span>
                            <Badge count={0}>
                              <div className="flex space-x-1 text-gray-300">
                                <div className="text-base">Cart</div>
                                <div>
                                  <ShoppingCartIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                  />
                                </div>
                              </div>
                            </Badge>
                          </button>
                        ) : !user ? (
                          <button
                            type="button"
                            className="hover:cursor-default rounded-full bg-gray-800 p-1 text-gray-400 "
                          >
                            <span className="sr-only">View notifications</span>
                            <Badge count={0}>
                              <div className="flex space-x-1 text-gray-300">
                                <div className="text-base">Cart</div>
                                <div>
                                  <ShoppingCartIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                  />
                                </div>
                              </div>
                            </Badge>
                          </button>
                        ) : (
                          <div className="cursor-default rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            ADMIN
                          </div>
                        )}

                        {/* Profile dropdown (Laptop)*/}
                        {user && user?.role === "user" ? (
                          <Menu as="div" className="relative ml-3 ">
                            <div>
                              <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">Open user menu</span>
                                <p className="text-white font-bold">
                                  {user?.user_name}
                                </p>
                              </Menu.Button>
                            </div>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {userNavigation.map((item) => (
                                  <Menu.Item key={item.name}>
                                    {({ active }) => (
                                      <Link
                                        to={item.href}
                                        className={classNames(
                                          active ? "bg-gray-100" : "",
                                          "block px-4 py-2 text-sm text-gray-700"
                                        )}
                                      >
                                        {item.name}
                                      </Link>
                                    )}
                                  </Menu.Item>
                                ))}
                                <Menu.Item className={"flex justify-center"}>
                                  <Button
                                    onClick={handleLogout}
                                    className="mx-auto font-serif"
                                  >
                                    Logout
                                  </Button>
                                </Menu.Item>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        ) : user && user?.role === "admin" ? (
                          <Menu as="div" className="relative ml-3 ">
                            <div>
                              <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">Open user menu</span>
                                <p className="text-white font-bold">
                                  {user?.user_name}
                                </p>
                              </Menu.Button>
                            </div>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {adminNavigation.map((item) => (
                                  <Menu.Item key={item.name}>
                                    {({ active }) => (
                                      <Link
                                        to={item.href}
                                        className={classNames(
                                          active ? "bg-gray-100" : "",
                                          "block px-4 py-2 text-sm text-gray-700"
                                        )}
                                      >
                                        {item.name}
                                      </Link>
                                    )}
                                  </Menu.Item>
                                ))}
                                <Menu.Item className={"flex justify-center"}>
                                  <Button
                                    onClick={handleLogout}
                                    className="mx-auto font-serif"
                                  >
                                    Logout
                                  </Button>
                                </Menu.Item>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        ) : (
                          <div className="space-x-6">
                            <NavLink to={"/login"}>
                              <button
                                type="button"
                                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                              >
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">
                                  View notifications
                                </span>
                                <span>Sign in</span>
                              </button>
                            </NavLink>
                            <NavLink to={"/register"}>
                              <button
                                type="button"
                                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                              >
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">
                                  View notifications
                                </span>
                                <span>Sign up</span>
                              </button>
                            </NavLink>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <Bars3Icon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="md:hidden">
                  <div className="px-2 pb-3 pt-2 sm:px-3">
                    <Input
                      type="text"
                      size="large"
                      placeholder="Search Products"
                      onChange={(e) => setSearchValue(e.target.value)}
                      prefix={
                        <BsSearch
                          onClick={() => handleProductSearchClick()}
                          className="cursor-pointer text-blue-500 hover:text-red-600 active:text-blue-600 text-xl"
                        />
                      }
                    />
                  </div>
                  <div className="border-t border-gray-700 pb-3 pt-4">
                    <div className="flex justify-between px-5">
                      {user ? (
                        <>
                          <div className="flex justify-center items-center">
                            <div className="font-medium leading-none text-white text-xs cursor-default">
                              {user?.user_name}
                            </div>
                          </div>
                          <Button
                            onMouseDown={handleLogout}
                            className="text-white"
                          >
                            Logout
                          </Button>
                        </>
                      ) : (
                        <>
                          <Link to={"/register"}>
                            <button
                              type="button"
                              className="relative ml-auto border border-zinc-50 flex-shrink-0 rounded-lg bg-gray-800 px-4 py-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                              <span className="absolute -inset-1.5" />
                              <span className="sr-only">
                                View notifications
                              </span>
                              Sign up
                            </button>
                          </Link>
                          <Link to={"/login"}>
                            <button
                              type="button"
                              className="relative ml-auto border border-zinc-50 flex-shrink-0 rounded-lg bg-gray-800 px-4 py-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                              <span className="absolute -inset-1.5" />
                              <span className="sr-only">
                                View notifications
                              </span>
                              Sign in
                            </button>
                          </Link>
                        </>
                      )}

                      {/* Mobile Cart */}
                      {user?.role === "user" && cart?.items?.length ? (
                        <Link to={"/dashboard/user/cart"}>
                          <button
                            type="button"
                            className=" rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          >
                            <span className="sr-only">View notifications</span>
                            <Badge count={user ? cart?.items?.length : null}>
                              <div className="flex space-x-1 text-gray-300">
                                <div className="text-base">Cart</div>
                                <div>
                                  <ShoppingCartIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                  />
                                </div>
                              </div>
                            </Badge>
                          </button>
                        </Link>
                      ) : user?.role === "user" && !cart?.items?.length ? (
                        <button
                          type="button"
                          className=" rounded-full bg-gray-800 p-1 text-gray-400  hover:cursor-default"
                        >
                          <span className="sr-only">View notifications</span>
                          <Badge count={0}>
                            <div className="flex space-x-1 text-gray-300">
                              <div className="text-base">Cart</div>
                              <div>
                                <ShoppingCartIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              </div>
                            </div>
                          </Badge>
                        </button>
                      ) : !user ? (
                        <button
                          type="button"
                          className="hover:cursor-default rounded-full bg-gray-800 p-1 text-gray-400 "
                        >
                          <span className="sr-only">View notifications</span>
                          <Badge count={0}>
                            <div className="flex space-x-1 text-gray-300">
                              <div className="text-base">Cart</div>
                              <div>
                                <ShoppingCartIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              </div>
                            </div>
                          </Badge>
                        </button>
                      ) : (
                        <div className="cursor-default rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          ADMIN
                        </div>
                      )}
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      {user?.role === "user"
                        ? userNavigation.map((item) => (
                            <Disclosure.Button
                              key={item.name}
                              as={Link}
                              to={item.href}
                              className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                            >
                              {item.name}
                            </Disclosure.Button>
                          ))
                        : adminNavigation.map((item) => (
                            <Disclosure.Button
                              key={item.name}
                              as={Link}
                              to={item.href}
                              className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                            >
                              {item.name}
                            </Disclosure.Button>
                          ))}
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    </>
  );
};

export default Navbar;
