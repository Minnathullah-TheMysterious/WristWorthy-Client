import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { fetchFilteredProductsAsync } from "./productListingSlice";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { PRODUCT_LIMIT_PER_PAGE } from "./../../../app/constants";

const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  { name: "Price: Low to High", sort: "price", order: "asc", current: false },
  { name: "Price: High to Low", sort: "price", order: "desc", current: false },
];

const filters = [
  {
    id: "category",
    name: "Category",
    options: [
      { value: "smartphones", label: "Smartphones", checked: false },

      { value: "laptops", label: "Laptops", checked: false },

      { value: "fragrances", label: "Fragrances", checked: false },

      { value: "skincare", label: "Skincare", checked: false },

      { value: "groceries", label: "Groceries", checked: false },

      { value: "home-decoration", label: "Home decoration", checked: false },

      { value: "furniture", label: "Furniture", checked: false },

      { value: "tops", label: "Tops", checked: false },

      { value: "womens-dresses", label: "Womens dresses", checked: false },

      { value: "womens-shoes", label: "Womens shoes", checked: false },

      { value: "mens-shirts", label: "Mens shirts", checked: false },

      { value: "mens-shoes", label: "Mens shoes", checked: false },

      { value: "mens-watches", label: "Mens watches", checked: false },

      { value: "womens-watches", label: "Womens watches", checked: false },

      { value: "womens-bags", label: "Womens bags", checked: false },

      { value: "womens-jewellery", label: "Womens jewellery", checked: false },

      { value: "sunglasses", label: "Sunglasses", checked: false },

      { value: "automotive", label: "Automotive", checked: false },

      { value: "motorcycle", label: "Motorcycle", checked: false },

      { value: "lighting", label: "Lighting", checked: false },
    ],
  },
  {
    id: "brand",
    name: "Brand",
    options: [
      { value: "Apple", label: "Apple", checked: false },

      { value: "Samsung", label: "Samsung", checked: false },

      { value: "OPPO", label: "OPPO", checked: false },

      { value: "Huawei", label: "Huawei", checked: false },

      {
        value: "Microsoft Surface",
        label: "Microsoft Surface",
        checked: false,
      },

      { value: "Infinix", label: "Infinix", checked: false },

      { value: "HP Pavilion", label: "HP Pavilion", checked: false },

      {
        value: "Impression of Acqua Di Gio",
        label: "Impression of Acqua Di Gio",
        checked: false,
      },

      { value: "Royal_Mirage", label: "Royal_Mirage", checked: false },

      {
        value: "Fog Scent Xpressio",
        label: "Fog Scent Xpressio",
        checked: false,
      },

      { value: "Al Munakh", label: "Al Munakh", checked: false },

      { value: "Lord - Al-Rehab", label: "Lord   Al Rehab", checked: false },

      { value: "L'Oreal Paris", label: "L'Oreal Paris", checked: false },

      { value: "Hemani Tea", label: "Hemani Tea", checked: false },

      { value: "Dermive", label: "Dermive", checked: false },

      { value: "ROREC White Rice", label: "ROREC White Rice", checked: false },

      { value: "Fair & Clear", label: "Fair & Clear", checked: false },

      { value: "Saaf & Khaas", label: "Saaf & Khaas", checked: false },

      { value: "Bake Parlor Big", label: "Bake Parlor Big", checked: false },

      {
        value: "Baking Food Items",
        label: "Baking Food Items",
        checked: false,
      },

      { value: "fauji", label: "Fauji", checked: false },

      { value: "Dry Rose", label: "Dry Rose", checked: false },

      { value: "Boho Decor", label: "Boho Decor", checked: false },

      { value: "Flying Wooden", label: "Flying Wooden", checked: false },

      { value: "LED Lights", label: "LED Lights", checked: false },

      { value: "luxury palace", label: "Luxury palace", checked: false },

      { value: "Golden", label: "Golden", checked: false },

      {
        value: "Furniture Bed Set",
        label: "Furniture Bed Set",
        checked: false,
      },

      { value: "Ratttan Outdoor", label: "Ratttan Outdoor", checked: false },

      { value: "Kitchen Shelf", label: "Kitchen Shelf", checked: false },

      { value: "Multi Purpose", label: "Multi Purpose", checked: false },

      { value: "AmnaMart", label: "AmnaMart", checked: false },

      {
        value: "Professional Wear",
        label: "Professional Wear",
        checked: false,
      },

      { value: "Soft Cotton", label: "Soft Cotton", checked: false },

      { value: "Top Sweater", label: "Top Sweater", checked: false },

      {
        value: "RED MICKY MOUSE..",
        label: "RED MICKY MOUSE..",
        checked: false,
      },

      { value: "Digital Printed", label: "Digital Printed", checked: false },

      { value: "Ghazi Fabric", label: "Ghazi Fabric", checked: false },

      { value: "IELGY", label: "IELGY", checked: false },

      { value: "IELGY fashion", label: "IELGY fashion", checked: false },

      {
        value: "Synthetic Leather",
        label: "Synthetic Leather",
        checked: false,
      },

      {
        value: "Sandals Flip Flops",
        label: "Sandals Flip Flops",
        checked: false,
      },

      { value: "Maasai Sandals", label: "Maasai Sandals", checked: false },

      { value: "Arrivals Genuine", label: "Arrivals Genuine", checked: false },

      { value: "Vintage Apparel", label: "Vintage Apparel", checked: false },

      { value: "FREE FIRE", label: "FREE FIRE", checked: false },

      { value: "The Warehouse", label: "The Warehouse", checked: false },

      { value: "Sneakers", label: "Sneakers", checked: false },

      { value: "Rubber", label: "Rubber", checked: false },

      { value: "Naviforce", label: "Naviforce", checked: false },

      { value: "SKMEI 9117", label: "SKMEI 9117", checked: false },

      { value: "Strap Skeleton", label: "Strap Skeleton", checked: false },

      { value: "Stainless", label: "Stainless", checked: false },

      { value: "Eastern Watches", label: "Eastern Watches", checked: false },

      { value: "Luxury Digital", label: "Luxury Digital", checked: false },

      { value: "Watch Pearls", label: "Watch Pearls", checked: false },

      { value: "Bracelet", label: "Bracelet", checked: false },

      { value: "LouisWill", label: "LouisWill", checked: false },

      { value: "Copenhagen Luxe", label: "Copenhagen Luxe", checked: false },

      { value: "Steal Frame", label: "Steal Frame", checked: false },

      { value: "Darojay", label: "Darojay", checked: false },

      {
        value: "Fashion Jewellery",
        label: "Fashion Jewellery",
        checked: false,
      },

      { value: "Cuff Butterfly", label: "Cuff Butterfly", checked: false },

      {
        value: "Designer Sun Glasses",
        label: "Designer Sun Glasses",
        checked: false,
      },

      { value: "mastar watch", label: "Mastar watch", checked: false },

      { value: "Car Aux", label: "Car Aux", checked: false },

      { value: "W1209 DC12V", label: "W1209 DC12V", checked: false },

      { value: "TC Reusable", label: "TC Reusable", checked: false },

      { value: "Neon LED Light", label: "Neon LED Light", checked: false },

      {
        value: "METRO 70cc Motorcycle - MR70",
        label: "METRO 70cc Motorcycle   MR70",
        checked: false,
      },

      { value: "BRAVE BULL", label: "BRAVE BULL", checked: false },

      { value: "shock absorber", label: "Shock absorber", checked: false },

      { value: "JIEPOLLY", label: "JIEPOLLY", checked: false },

      { value: "Xiangle", label: "Xiangle", checked: false },

      {
        value: "lightingbrilliance",
        label: "Lightingbrilliance",
        checked: false,
      },

      { value: "Ifei Home", label: "Ifei Home", checked: false },

      { value: "DADAWU", label: "DADAWU", checked: false },

      { value: "YIOSI", label: "YIOSI", checked: false },
    ],
  },
  {
    id: "price",
    name: "Price",
    options: [
      { value: 10, label: "$10", checked: false },
      { value: 12, label: "$12", checked: false },
      { value: 13, label: "$13", checked: false },
      { value: 14, label: "$14", checked: false },
      { value: 19, label: "$19", checked: false },
      { value: 20, label: "$20", checked: false },
      { value: 23, label: "$23", checked: false },
      { value: 25, label: "$25", checked: false },
      { value: 28, label: "$28", checked: false },
      { value: 29, label: "$29", checked: false },
      { value: 30, label: "$30", checked: false },
      { value: 34, label: "$34", checked: false },
      { value: 35, label: "$35", checked: false },
      { value: 36, label: "$36", checked: false },
      { value: 40, label: "$40", checked: false },
      { value: 41, label: "$41", checked: false },
      { value: 44, label: "$44", checked: false },
      { value: 45, label: "$45", checked: false },
      { value: 46, label: "$46", checked: false },
      { value: 47, label: "$47", checked: false },
      { value: 50, label: "$50", checked: false },
      { value: 51, label: "$51", checked: false },
      { value: 55, label: "$55", checked: false },
      { value: 57, label: "$57", checked: false },
      { value: 58, label: "$58", checked: false },
      { value: 60, label: "$60", checked: false },
      { value: 66, label: "$66", checked: false },
      { value: 68, label: "$68", checked: false },
      { value: 70, label: "$70", checked: false },
      { value: 79, label: "$79", checked: false },
      { value: 80, label: "$80", checked: false },
      { value: 90, label: "$90", checked: false },
      { value: 100, label: "$100", checked: false },
      { value: 120, label: "$120", checked: false },
      { value: 280, label: "$280", checked: false },
      { value: 499, label: "$499", checked: false },
      { value: 549, label: "$549", checked: false },
      { value: 569, label: "$569", checked: false },
      { value: 600, label: "$600", checked: false },
      { value: 700, label: "$700", checked: false },
      { value: 899, label: "$899", checked: false },
      { value: 900, label: "$900", checked: false },
      { value: 920, label: "$920", checked: false },
      { value: 930, label: "$930", checked: false },
      { value: 1050, label: "$1050", checked: false },
      { value: 1099, label: "$1099", checked: false },
      { value: 1249, label: "$1249", checked: false },
      { value: 1499, label: "$1499", checked: false },
      { value: 1749, label: "$1749", checked: false },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductListing = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filter, setFilter] = useState({});
  const [pageNum, setPageNum] = useState(1);
  const [sort, setSort] = useState({});

  const products = useSelector((state) => state.product);
  console.log(products);
  const totalProductsCount = products.totalProductsCount;
  console.log(totalProductsCount);
  const dispatch = useDispatch();

  const handleFilterChange = (e, section, option) => {
    const isChecked = e.target.checked;
    const newFilter = { ...filter };

    if (isChecked) {
      // Add the selected value to the filter section's array
      if (!newFilter[section.id]) {
        newFilter[section.id] = [option.value];
      } else {
        newFilter[section.id].push(option.value);
      }
    } else {
      // Remove the unchecked value from the filter section's array
      if (newFilter[section.id]) {
        const updatedValues = newFilter[section.id].filter(
          (value) => value !== option.value
        );
        console.log("Updated values after removing filter:", updatedValues);

        if (updatedValues.length === 0) {
          delete newFilter[section.id];
          console.log("Filter section removed:", newFilter);
        } else {
          newFilter[section.id] = updatedValues;
          console.log("Filter section updated:", newFilter);
        }
      }
    }
    // console.log('newFilter: ',newFilter);
    setFilter(newFilter);
  };

  const handleSorting = (e, option) => {
    const sort = { _sort: option.sort, _order: option.order };
    console.log(sort);
    setSort(sort);
  };

  const handlePagination = (e, pageNum) => {
    e.preventDefault();
    setPageNum(pageNum);
    console.log("page number:", pageNum);
  };

  useEffect(() => {
    const pagination = { _page: pageNum, _limit: PRODUCT_LIMIT_PER_PAGE };
    dispatch(fetchFilteredProductsAsync({ filter, sort, pagination }));
  }, [filter, sort, dispatch, pageNum]);

  useEffect(()=>{
    setPageNum(1)
  },[totalProductsCount, sort])

  return (
    <div className="bg-white">
      <section className="filter">
        {/* Mobile filter dialog */}
        <MobileFilterDialog
          filtersOpen={mobileFiltersOpen}
          setFiltersOpen={setMobileFiltersOpen}
          handleFilterChange={handleFilterChange}
        />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Sorting */}
          <Sorting
            setFiltersOpen={setMobileFiltersOpen}
            handleSorting={handleSorting}
          />

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/*Laptop Filters */}
              <DesktopFilter handleFilterChange={handleFilterChange} />

              {/* Product grid */}
              <ProductGrid products={products} />
            </div>

            {/* Pagination */}
            <Pagination
              handlePagination={handlePagination}
              pageNum={pageNum}
              setPageNum={setPageNum}
              PRODUCT_LIMIT_PER_PAGE={PRODUCT_LIMIT_PER_PAGE}
              totalProductsCount={totalProductsCount}
            />
          </section>
        </main>
      </section>
    </div>
  );
};

function MobileFilterDialog({
  filtersOpen,
  setFiltersOpen,
  handleFilterChange,
}) {
  return (
    <Transition.Root show={filtersOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
        onClose={setFiltersOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/*Mobile Filters */}
              <form className="mt-4 border-t border-gray-200">
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  onChange={(e) =>
                                    handleFilterChange(e, section, option)
                                  }
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function Sorting({ setFiltersOpen, handleSorting }) {
  return (
    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-14">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        Products
      </h1>

      <div className="flex items-center">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
              Sort
              <ChevronDownIcon
                className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
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
            {/* Sorting Options */}
            <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {sortOptions.map((option) => (
                  <Menu.Item key={option.name}>
                    {({ active }) => (
                      <p
                        onClick={(e) => handleSorting(e, option)}
                        className={classNames(
                          option.current
                            ? "font-medium text-gray-900 cursor-pointer"
                            : "text-gray-500 cursor-pointer",
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        {option.name}
                      </p>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>

        <button
          type="button"
          className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
        >
          <span className="sr-only">View grid</span>
          <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
          onClick={() => setFiltersOpen(true)}
        >
          <span className="sr-only">Filters</span>
          <FunnelIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function DesktopFilter({ handleFilterChange }) {
  return (
    <form className="hidden lg:block">
      {filters.map((section) => (
        <Disclosure
          as="div"
          key={section.id}
          className="border-b border-gray-200 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">
                    {section.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-4">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        defaultChecked={option.checked}
                        onChange={(e) => handleFilterChange(e, section, option)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </form>
  );
}

function Pagination({
  handlePagination,
  PRODUCT_LIMIT_PER_PAGE,
  setPageNum,
  pageNum,
  totalProductsCount,
}) {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      {/* Mobile Pagination */}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={(e) => {
            e.preventDefault();
            setPageNum(pageNum - 1);
          }}
          disabled={pageNum === 1 ? true : false}
          className="relative rounded-lg inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0 active:bg-blue-800 active:text-white disabled:bg-gray-300 disabled:text-gray-900 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setPageNum(pageNum + 1);
          }}
          disabled={
            Math.ceil(totalProductsCount / pageNum) <= PRODUCT_LIMIT_PER_PAGE
              ? true
              : false
          }
          className="relative rounded-lg inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0 active:bg-blue-800 active:text-white disabled:bg-gray-300 disabled:text-gray-900 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
      {/* Laptop Pagination */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(pageNum - 1) * PRODUCT_LIMIT_PER_PAGE + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {pageNum * PRODUCT_LIMIT_PER_PAGE > totalProductsCount
                ? totalProductsCount
                : pageNum * PRODUCT_LIMIT_PER_PAGE}
            </span>{" "}
            of <span className="font-medium">{totalProductsCount}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0 active:bg-blue-800 active:text-white disabled:bg-gray-300 disabled:text-gray-900 disabled:cursor-not-allowed"
              disabled={pageNum === 1 ? true : false}
              onClick={(e) => {
                e.preventDefault();
                setPageNum(pageNum - 1);
              }}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}

            {Array.from({
              length: Math.ceil(totalProductsCount / PRODUCT_LIMIT_PER_PAGE),
            }).map((element, index) => (
              <button
                key={index}
                onClick={(e) => {
                  handlePagination(e, index + 1);
                }}
                aria-current="page"
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 hover:text-gray-900 focus:z-20 focus:outline-offset-0 active:bg-blue-700 active:text-white ${
                  pageNum === index + 1
                    ? "bg-blue-600 text-white hover:bg-blue-500"
                    : ""
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 hover:text-gray-900 focus:z-20 focus:outline-offset-0 active:bg-blue-700 active:text-white disabled:bg-gray-300 disabled:text-gray-900 disabled:cursor-not-allowed ${
                pageNum > 10 ? "bg-blue-600 text-white hover:bg-blue-500" : null
              }`}
              onClick={(e) => {
                e.preventDefault();
                setPageNum(pageNum + 1);
              }}
              disabled={
                Math.ceil(totalProductsCount / pageNum) <=
                PRODUCT_LIMIT_PER_PAGE
                  ? true
                  : false
              }
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}

function ProductGrid({ products }) {
  return (
    <div className="lg:col-span-3">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Customers also purchased
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4">
            {products.loading && (
              <p className="text-xl font-bold font-serif">Loading...</p>
            )}
            {!products.loading && products.error ? (
              <p>Error: {products.error}</p>
            ) : null}
            {!products.loading && products.products.length
              ? products.products.map((product) => (
                  <Link to={"/product-details"} key={product.id}>
                    <div className="group relative border border-solid border-black p-1 rounded-lg">
                      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-80 lg:h-60">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        />
                      </div>
                      <div className="mt-4 flex justify-between space-x-4">
                        <div>
                          <p className="mt-1 text-sm text-gray-500 font-bold font-mono line-through">
                            ${product.price}
                          </p>
                          <p className="mt-1 text-sm text-black font-bold font-mono">
                            $
                            {Math.round(
                              product.price *
                                (1 - product.discountPercentage / 100)
                            )}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-bold font-serif text-purple-900">
                            {product.title}
                          </p>
                          <p className=" text-sm font-medium text-gray-900">
                            <StarIcon className="w-5 inline mb-1" />
                            {product.rating}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductListing;
