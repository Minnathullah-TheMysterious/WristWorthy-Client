import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  fetchAllProductsByFiltersAsync,
  fetchBrandsAsync,
  fetchCategoriesAsync,
} from "../productSlice";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { PRODUCT_LIMIT_PER_PAGE_FOR_USER } from "../../../app/constants";
import { TbJewishStar } from "react-icons/tb";
import { addToWishlistAsync } from "../../wishlist/wishlistSlice";
import toast from "react-hot-toast";
import Loader from "../../../loaders/Loader";
import { Prices } from "../../../app/pricing";

const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  { name: "Price: Low to High", sort: "price", order: "asc", current: false },
  { name: "Price: High to Low", sort: "price", order: "desc", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductListing = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filter, setFilter] = useState({});
  const [pageNum, setPageNum] = useState(1);
  const [sort, setSort] = useState({});

  const categories = useSelector((state) => state?.product?.categories);
  const brands = useSelector((state) => state?.product?.brands);
  const products = useSelector((state) => state?.product);
  const totalProductsCount = useSelector(
    (state) => state?.product?.totalNonDeletedProductsCount
  );
  const dispatch = useDispatch();

  const filters = [
    {
      id: "category",
      name: "Category",
      options: categories,
    },
    {
      id: "brand",
      name: "Brand",
      options: brands,
    },
  ];

  const priceFilter = [
    {
      id: "price",
      name: "Price",
      options: Prices,
    },
  ];

  const handleFilterChange = (e, section, option) => {
    console.log(e, section, option);
    const isChecked = e.target.checked;
    const newFilter = { ...filter };
    console.log(newFilter);

    if (isChecked) {
      // Add the selected value to the filter section's array
      if (!newFilter[section.id]) {
        newFilter[section.id] = [option._id];
        console.log(newFilter);
      } else {
        newFilter[section.id].push(option._id);
        console.log(newFilter);
      }
    } else {
      // Remove the unchecked value from the filter section's array
      if (newFilter[section.id]) {
        const updatedValues = newFilter[section.id].filter(
          (value) => value !== option._id
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
    console.log("newFilter: ", newFilter);
    setFilter(newFilter);
  };

  const handlePriceFilterChange = (value) => {
    console.log(`value=${value}`);
    const priceArray = value.split(",");
    console.log(priceArray);
    const newFilter = {
      ...filter,
      lowerPriceLimit: [+priceArray[0]],
      higherPriceLimit: [+priceArray[1]],
    };
    console.log("newFilter: ", newFilter);
    setFilter(newFilter);
  };

  const handleSorting = (e, option) => {
    const sort = { _sort: option.sort, _order: option.order };
    setSort(sort);
    console.log(sort);
  };

  const handlePagination = (e, pageNum) => {
    e.preventDefault();
    setPageNum(pageNum);
    console.log("page number:", pageNum);
  };

  useEffect(() => {
    const pagination = {
      _page: pageNum,
      _limit: PRODUCT_LIMIT_PER_PAGE_FOR_USER,
    };
    dispatch(fetchAllProductsByFiltersAsync({ filter, sort, pagination }));
  }, [filter, sort, dispatch, pageNum]);

  useEffect(() => {
    setPageNum(1);
  }, [totalProductsCount, sort]);

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
    dispatch(fetchBrandsAsync());
  }, [dispatch]);

  return (
    <div className="bg-white">
      <section className="filter">
        {/* Mobile filter dialog */}
        <MobileFilterDialog
          filtersOpen={mobileFiltersOpen}
          setFiltersOpen={setMobileFiltersOpen}
          handleFilterChange={handleFilterChange}
          filters={filters}
          priceFilter={priceFilter}
          handlePriceFilterChange={handlePriceFilterChange}
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
              <DesktopFilter
                handleFilterChange={handleFilterChange}
                filters={filters}
                priceFilter={priceFilter}
                handlePriceFilterChange={handlePriceFilterChange}
              />

              {/* Product grid */}
              <ProductGrid products={products} />
            </div>

            {/* Pagination */}
            <Pagination
              handlePagination={handlePagination}
              pageNum={pageNum}
              setPageNum={setPageNum}
              PRODUCT_LIMIT_PER_PAGE_FOR_USER={PRODUCT_LIMIT_PER_PAGE_FOR_USER}
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
  filters,
  priceFilter,
  handlePriceFilterChange,
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
                            {section.options.map((option) => (
                              <div
                                key={option._id}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-mobile-${section.id}-${option.slug}`}
                                  name={section.id}
                                  defaultValue={option.slug}
                                  type="checkbox"
                                  onChange={(e) =>
                                    handleFilterChange(e, section, option)
                                  }
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${option.slug}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {option.brand_name || option.category_name}
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
              <form className="mt-4 border-t border-gray-200 px-4">
                {priceFilter.map((section) => (
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
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="radio"
                                  value={option.value}
                                  onChange={(e) =>
                                    handlePriceFilterChange(e.target.value)
                                  }
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
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 font-serif">
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

function DesktopFilter({
  handleFilterChange,
  filters,
  priceFilter,
  handlePriceFilterChange,
}) {
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
                  {section.options?.map((option) => (
                    <div key={option._id} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${option._id}`}
                        name={`${section.value}`}
                        defaultValue={option.slug}
                        type="checkbox"
                        onChange={(e) => handleFilterChange(e, section, option)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter-${section.id}-${option._id}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option?.category_name || option?.brand_name}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
      {priceFilter.map((section) => (
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
                        type="radio"
                        value={option.value}
                        onChange={(e) =>
                          handlePriceFilterChange(e.target.value)
                        }
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
  PRODUCT_LIMIT_PER_PAGE_FOR_USER,
  setPageNum,
  pageNum,
  totalProductsCount,
}) {
  const totalPages = Math.ceil(
    totalProductsCount / PRODUCT_LIMIT_PER_PAGE_FOR_USER
  );
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
            Math.ceil(totalProductsCount / pageNum) <=
            PRODUCT_LIMIT_PER_PAGE_FOR_USER
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
              {(pageNum - 1) * PRODUCT_LIMIT_PER_PAGE_FOR_USER + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {pageNum * PRODUCT_LIMIT_PER_PAGE_FOR_USER > totalProductsCount
                ? totalProductsCount
                : pageNum * PRODUCT_LIMIT_PER_PAGE_FOR_USER}
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
              length: totalPages,
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
                PRODUCT_LIMIT_PER_PAGE_FOR_USER
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state?.auth?.user?._id);

  const handleAddToWishlistClick = (productId) => {
    if (userId) {
      dispatch(addToWishlistAsync({ userId, productId }));
    } else {
      toast("Please Login To Add To Wishlist", {
        className: "font-serif bg-blue-900 text-white",
      });
      navigate("/login");
    }
  };

  return (
    <div className="lg:col-span-3">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Customers also purchased
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4">
            {products.loading && <Loader />}
            {/* {!products.loading && products.error ? (
              <p>Error: {products.error}</p>
            ) : null} */}
            {!products.loading && products?.nonDeletedProducts?.length
              ? products?.nonDeletedProducts.map((product) => (
                  <div key={product._id} className="relative">
                    <Link to={`/product-details/${product._id}`}>
                      <div className="group border-2 border-solid border-black p-[1px] rounded-lg">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-80 lg:h-60">
                          <img
                            src={product.thumbnail.location}
                            alt={product.product_name}
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
                              {product.product_name}
                            </p>
                            <p className=" text-sm font-medium text-gray-900">
                              <StarIcon className="w-5 inline mb-1" />
                              {product.rating || 4.5}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div
                      onClick={() => handleAddToWishlistClick(product._id)}
                      className="py-1 mt-1 flex justify-center items-center space-x-4 rounded-lg bg-sky-800 text-white hover:cursor-pointer hover:bg-sky-900 active:bg-sky-800"
                    >
                      <span>{"Add To Wishlist"}</span> <TbJewishStar />
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductListing;
