import React, { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BsSearch } from "react-icons/bs";
import { Input, Badge, Select, Button } from "antd";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { authDetailsAsync } from "../../auth/authSlice";

// const navigation = [{ name: "Home", href: "/", current: false }];

const userNavigation = [
  { id: 1, name: "My Profile", href: "/user/profile" },
  { id: 2, name: "My Orders", href: "/user/orders" },
  { id: 3, name: "Wish List", href: "/user/wish-list" },
  { id: 4, name: "Manage Addresses", href: "/user/addresses" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
    if (userFromLocalStorage) {
      dispatch(authDetailsAsync());
    }
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(authDetailsAsync());
    navigate("/login");
  };

  return (
    <>
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

                    <div className="ml-10 items-baseline hidden md:block lg:w-[500px] w-52">
                      <Input
                        type="text"
                        size="large"
                        placeholder="Search Products"
                        prefix={<BsSearch />}
                      />
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6 md:space-x-6">
                      {user !== null ? (
                        <Select
                          size="large"
                          placeholder={"My Account"}
                          className="lg:w-52 w-32 text-lg "
                          value={"My Account"}
                        >
                          {userNavigation.map((item) => (
                            <Select.Option key={item.id} value={item.id}>
                              <Link to={item.href}>{item.name}</Link>
                            </Select.Option>
                          ))}
                          <Select.Option onMouseDown={handleLogout}>
                            <span>Logout</span>
                          </Select.Option>
                        </Select>
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

                      <NavLink to={"/dashboard/cart"}>
                        <button
                          type="button"
                          className=" rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="sr-only">View notifications</span>
                          <Badge count={user ? cart.length : null} showZero>
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
                      </NavLink>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3 ">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <p className="text-white font-bold">{user?.name}</p>
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
                          </Menu.Items>
                        </Transition>
                      </Menu>
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
                {/* <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as={Link}
                      to={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div> */}
                <div className="px-2 pb-3 pt-2 sm:px-3">
                  <Input
                    type="text"
                    size="large"
                    placeholder="Search Products"
                    prefix={<BsSearch />}
                  />
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex justify-between px-5">
                    {user ? (
                      <>
                        <div className="flex justify-center items-center">
                          <div className="font-medium leading-none text-white text-xs cursor-default">
                            {user?.user?.user_name}
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
                            <span className="sr-only">View notifications</span>
                            Sign up
                          </button>
                        </Link>
                        <Link to={"/login"}>
                          <button
                            type="button"
                            className="relative ml-auto border border-zinc-50 flex-shrink-0 rounded-lg bg-gray-800 px-4 py-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          >
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">View notifications</span>
                            Sign in
                          </button>
                        </Link>
                      </>
                    )}

                    <Link to={"/dashboard/cart"}>
                      <button
                        type="button"
                        className=" rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">View notifications</span>
                        <Badge count={user?cart.length:null} showZero>
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
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="Link"
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
    </>
  );
};

export default Navbar;
