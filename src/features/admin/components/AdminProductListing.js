import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Modal, Badge, Space, Button } from "antd";
import { FiAlertTriangle } from "react-icons/fi";
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
import {
  deleteProductAsync,
  fetchAllProductsByFiltersAsync,
  restoreProductAsync,
  updateProductThumbnailAsync,
} from "../../products/productSlice";
import {
  DISCOUNTED_PRICE,
  PRODUCT_LIMIT_PER_PAGE_FOR_ADMIN,
} from "../../../app/constants";
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

const AdminProductListing = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filter, setFilter] = useState({});
  const [pageNum, setPageNum] = useState(1);
  const [sort, setSort] = useState({});

  const categories = useSelector((state) => state.product.categories);
  const brands = useSelector((state) => state.product.brands);
  const products = useSelector((state) => state.product);
  const totalProductsCount = useSelector(
    (state) => state?.product?.totalProductsCount
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
    const isChecked = e.target.checked;
    const newFilter = { ...filter };

    if (isChecked) {
      // Add the selected value to the filter section's array
      if (!newFilter[section.id]) {
        newFilter[section.id] = [option._id];
      } else {
        newFilter[section.id].push(option._id);
      }
    } else {
      // Remove the unchecked value from the filter section's array
      if (newFilter[section.id]) {
        const updatedValues = newFilter[section.id].filter(
          (value) => value !== option._id
        );

        if (updatedValues.length === 0) {
          delete newFilter[section.id];
        } else {
          newFilter[section.id] = updatedValues;
        }
      }
    }
    setFilter(newFilter);
  };

  const handlePriceFilterChange = (value) => {
    const priceArray = value.split(",");
    const newFilter = {
      ...filter,
      lowerPriceLimit: [+priceArray[0]],
      higherPriceLimit: [+priceArray[1]],
    };
    setFilter(newFilter);
  };

  const handleSorting = (e, option) => {
    const sort = { _sort: option.sort, _order: option.order };
    setSort(sort);
  };

  const handlePagination = (e, pageNum) => {
    e.preventDefault();
    setPageNum(pageNum);
  };

  useEffect(() => {
    const pagination = {
      _page: pageNum,
      _limit: PRODUCT_LIMIT_PER_PAGE_FOR_ADMIN,
    };
    dispatch(fetchAllProductsByFiltersAsync({ filter, sort, pagination }));
  }, [filter, sort, dispatch, pageNum]);

  useEffect(() => {
    setPageNum(1);
  }, [totalProductsCount, sort]);

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
            <Link to={"/dashboard/admin/create-product"}>
              <p className="font-bold font-serif text-center bg-sky-800 text-white py-3 rounded-lg hover:cursor-pointer tracking-widest hover:bg-blue-600 active:bg-sky-800">
                Add New Product
              </p>
            </Link>

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
              PRODUCT_LIMIT_PER_PAGE_FOR_ADMIN={
                PRODUCT_LIMIT_PER_PAGE_FOR_ADMIN
              }
              totalProductsCount={totalProductsCount}
            />
          </section>
        </main>
      </section>
    </div>
  );
};

/******************Mobile Filter***************** */
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

/******************Sorting***************** */
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

/******************Desktop Filter***************** */
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

/******************Pagination***************** */
function Pagination({
  handlePagination,
  PRODUCT_LIMIT_PER_PAGE_FOR_ADMIN,
  setPageNum,
  pageNum,
  totalProductsCount,
}) {
  const totalPages = Math.ceil(
    totalProductsCount / PRODUCT_LIMIT_PER_PAGE_FOR_ADMIN
  );
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      {/* Mobile Pagination */}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 2000, behavior: "smooth" });
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
            window.scrollTo({ top: 2000, behavior: "smooth" });
            setPageNum(pageNum + 1);
          }}
          disabled={
            Math.ceil(totalProductsCount / pageNum) <=
            PRODUCT_LIMIT_PER_PAGE_FOR_ADMIN
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
              {(pageNum - 1) * PRODUCT_LIMIT_PER_PAGE_FOR_ADMIN + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {pageNum * PRODUCT_LIMIT_PER_PAGE_FOR_ADMIN > totalProductsCount
                ? totalProductsCount
                : pageNum * PRODUCT_LIMIT_PER_PAGE_FOR_ADMIN}
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
                window.scrollTo({ top: 2000, behavior: "smooth" });
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
                  window.scrollTo({ top: 2000, behavior: "smooth" });
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
                window.scrollTo({ top: 2000, behavior: "smooth" });
                setPageNum(pageNum + 1);
              }}
              disabled={
                Math.ceil(totalProductsCount / pageNum) <=
                PRODUCT_LIMIT_PER_PAGE_FOR_ADMIN
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

/******************Product Grid***************** */
function ProductGrid({ products }) {
  const dispatch = useDispatch();
  const { confirm } = Modal;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productThumbnailPath, setProductThumbnailPath] = useState(null);
  const [productThumbnailOriginalname, setProductThumbnailOriginalname] =
    useState("");
  const [changeProductThumbnail, setChangeProductThumbnail] = useState(null);
  const [productId, setProductId] = useState("");

  const showDeleteConfirm = (productName, productId) => {
    confirm({
      title: `Are you sure to delete the '${productName}' Product?`,
      icon: <FiAlertTriangle className="font-bold text-red-700 text-2xl" />,
      content: "You can restore the product any time you wanted.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch(deleteProductAsync(productId));
      },
      onCancel() {},
    });
  };

  const showRestoreConfirm = (productName, productId) => {
    confirm({
      title: `Are you sure to Restore the '${productName}' Product?`,
      icon: <FiAlertTriangle className="font-bold text-red-700 text-2xl" />,
      content: "You can delete the product any time you wanted.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch(restoreProductAsync(productId));
      },
      onCancel() {},
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    const formData = new FormData();
    formData.append("thumbnail", changeProductThumbnail);
    dispatch(updateProductThumbnailAsync({ productId, formData }));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="lg:col-span-3">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4">
            {products?.loading && <Loader />}
            {/* {!products.loading && products.error ? (
              <p>Error: {products.error}</p>
            ) : null} */}
            {!products?.loading && products?.products?.length
              ? products?.products?.map((product) => (
                  <Space
                    key={product._id}
                    direction="vertical"
                    size="middle"
                    style={{
                      width: "100%",
                    }}
                  >
                    <Badge.Ribbon
                      text={
                        product.deleted
                          ? "Deleted Product"
                          : product.stock < 1
                          ? "Out Of Stock"
                          : `Stock - ${product.stock}`
                      }
                      color={
                        product.deleted
                          ? "red"
                          : product.stock < 1
                          ? "purple"
                          : "green"
                      }
                    >
                      <div className="group relative ">
                        <Link
                          to={`/dashboard/admin/product-details/${product._id}`}
                        >
                          <div className="border border-solid border-black p-1 rounded-lg">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-80 lg:h-60">
                              <img
                                src={`/${product.thumbnail.location}`}
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
                                  ${DISCOUNTED_PRICE(product)}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-bold font-serif text-purple-900">
                                  {product.product_name}
                                </p>
                                <p className=" text-sm font-medium text-gray-900">
                                  <StarIcon className="w-5 inline mb-1" />
                                  {product.rating || 4}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>
                        {/* Update Product Thumbnail Modal */}
                        <section>
                          <Button
                            className="bg-sky-800 text-white min-w-full"
                            type="primary"
                            onClick={() => {
                              showModal();
                              setProductThumbnailPath(
                                product.thumbnail.location
                              );
                              setChangeProductThumbnail(null);
                              setProductId(product._id);
                              setProductThumbnailOriginalname(
                                product.thumbnail.originalname
                              );
                            }}
                          >
                            Change Thumbnail
                          </Button>
                          <Modal
                            open={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            okText={"Update Thumbnail"}
                            okButtonProps={{
                              style: {
                                color: "black",
                                fontFamily: "sans-serif",
                                fontWeight: "bold",
                              },
                            }}
                            cancelButtonProps={{
                              style: {
                                fontFamily: "sans-serif",
                                fontWeight: "bold",
                              },
                            }}
                          >
                            <form className="space-y-5" onSubmit={handleOk}>
                              <h1 className="text-center font-serif font-bold text-xl">
                                Change Product Thumbnail
                              </h1>
                              <div className="space-y-2">
                                {productThumbnailPath &&
                                  !changeProductThumbnail && (
                                    <div className="flex justify-center">
                                      <img
                                        src={`${productThumbnailPath}`}
                                        alt={product.product_name}
                                        className="h-52 w-52 "
                                      />
                                    </div>
                                  )}
                                {!productThumbnailPath &&
                                  changeProductThumbnail && (
                                    <div className="flex justify-center">
                                      <img
                                        src={URL.createObjectURL(
                                          changeProductThumbnail
                                        )}
                                        alt={product.product_name}
                                        className="h-52 w-52 "
                                      />
                                    </div>
                                  )}
                                <label
                                  htmlFor="product_thumbnail"
                                  className="bg-blue-800 block text-white py-1 text-center rounded-lg hover:cursor-pointer hover:bg-blue-700 active:bg-blue-800"
                                >
                                  {productThumbnailPath
                                    ? productThumbnailOriginalname
                                    : changeProductThumbnail
                                    ? changeProductThumbnail.name
                                    : "Upload image for product thumbnail"}
                                  <input
                                    type="file"
                                    id="product_thumbnail"
                                    name="product_thumbnail"
                                    accept="image/*"
                                    hidden
                                    onChange={(e) => {
                                      setChangeProductThumbnail(
                                        e.target.files[0]
                                      );
                                      setProductThumbnailPath(null);
                                    }}
                                  />
                                </label>
                              </div>
                            </form>
                          </Modal>
                        </section>
                        {!product.deleted && (
                          <div className="flex justify-between space-x-1">
                            <Link
                              to={`/dashboard/admin/update-product/${product._id}`}
                              className="mt-1 py-2 text-center w-[50%] rounded-lg bg-sky-800 text-white hover:cursor-pointer hover:bg-sky-900 active:bg-sky-800"
                            >
                              Edit
                            </Link>
                            <div
                              onClick={() =>
                                showDeleteConfirm(
                                  product.product_name,
                                  product._id
                                )
                              }
                              className="mt-1 py-2 text-center w-[50%] rounded-lg bg-red-800 text-white hover:cursor-pointer hover:bg-red-900 active:bg-red-800"
                            >
                              Delete
                            </div>
                          </div>
                        )}
                        {product.deleted && (
                          <div
                            onClick={() =>
                              showRestoreConfirm(
                                product.product_name,
                                product._id
                              )
                            }
                            className="mt-1 py-2 text-center w-[100%] rounded-lg bg-green-800 text-white hover:cursor-pointer hover:bg-green-900 active:bg-green-800"
                          >
                            Restore
                          </div>
                        )}
                      </div>{" "}
                    </Badge.Ribbon>
                  </Space>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProductListing;
