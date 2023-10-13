import React, { useEffect } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRelatedProductsAsync,
  fetchSelectedProductAsync,
} from "../productSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  addItemToCartAsync,
  deleteUserCartItemAsync,
} from "../../cart/cartSlice";
import { DISCOUNTED_PRICE } from "../../../app/constants";
import { Badge, Space } from "antd";
import { TbJewishStar } from "react-icons/tb";
import Loader from "../../../loaders/Loader";
import { addToWishlistAsync } from "../../wishlist/wishlistSlice";

const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const selectedProduct = useSelector(
    (state) => state?.product?.selectedProduct
  );
  const user = useSelector((state) => state?.auth?.user);
  const carts = useSelector((state) => state?.cart?.items);
  const products = useSelector((state) => state?.product);

  const userId = user?._id;
  const productId = selectedProduct?._id;
  const productCategory = selectedProduct?.category;

  console.log(productCategory);

  useEffect(() => {
    dispatch(fetchSelectedProductAsync(params.productId));
    productCategory && dispatch(fetchRelatedProductsAsync({productCategory, productId}));
  }, [dispatch, params.productId, userId, productCategory, productId]);

  const productFound = carts?.items?.some(
    (item) => item?.product?._id === selectedProduct?._id
  );

  const handleAddToCartClick = async (e) => {
    e.preventDefault();

    if (user && !productFound && selectedProduct.stock >= 1) {
      dispatch(addItemToCartAsync(productId))
        .then(() => {
          navigate("/dashboard/user/cart");
        })
        .catch((error) => {
          toast.error("Failed To Add To Cart");
          console.error(
            "Something Went Wrong While dispatching the add-to-cart",
            error
          );
        });
    } else if (user && productFound && selectedProduct.stock >= 1) {
      navigate("/dashboard/user/cart");
    } else if (user && productFound && selectedProduct.stock < 1) {
      //remove product from cart if the item is out of stock since it has gone out of stock after adding to cart
      dispatch(deleteUserCartItemAsync(productId));
    } else if (user && !productFound && selectedProduct.stock < 1) {
      toast.error("Out Of Stock");
    } else if (!user) {
      toast("Login To Add To Cart", {
        className: "font-serif bg-blue-900 text-white",
      });
      navigate("/login");
    }
  };

  const cartBtn = productFound ? "Go To Cart" : "Add To Cart";

  const handleAddToWishlistClick = (productId) => {
    if (user) {
      dispatch(addToWishlistAsync(productId));
    } else {
      toast("Please Login To Add To Wishlist", {
        className: "font-serif bg-blue-900 text-white",
      });
      navigate("/login");
    }
  };

  return (
    <>
      <div className="bg-white border-b-4 border-gray-700">
        <div className="pt-6">
          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
              <img
                src={`/${selectedProduct?.images[0]?.location}`}
                alt={selectedProduct?.product_name}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              {selectedProduct?.images[1] && (
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                  <img
                    src={`/${selectedProduct?.images[1]?.location}`}
                    alt={selectedProduct?.product_name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              )}
              {selectedProduct?.images[2] && (
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                  <img
                    src={`/${selectedProduct?.images[2]?.location}`}
                    alt={selectedProduct?.product_name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              )}
            </div>
            {selectedProduct?.images[3] && (
              <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                <img
                  src={`/${selectedProduct?.images[3]?.location}`}
                  alt={selectedProduct?.product_name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {selectedProduct?.product_name}
              </h1>
              {selectedProduct?.stock < 1 ? (
                <p className="text-lg font-semibold text-red-600">
                  Out Of Stock
                </p>
              ) : null}
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight">
                <span className="line-through text-gray-400">
                  ${selectedProduct?.price}
                </span>{" "}
                |{" "}
                <span className="text-green-600 font-bold">
                  ${DISCOUNTED_PRICE(selectedProduct)}
                </span>
              </p>

              {/* Reviews (Static)*/}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          selectedProduct?.rating || 3.5 > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">
                    {selectedProduct?.rating || 4.5} out of 5 stars
                  </p>
                  <a
                    href={reviews.href}
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {reviews.totalCount} reviews
                  </a>
                </div>
              </div>

              <form className="mt-10">
                <button
                  onClick={(e) => handleAddToCartClick(e)}
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {cartBtn}
                </button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {selectedProduct?.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul className="list-disc space-y-2 pl-4 text-sm">
                    {selectedProduct?.highlights?.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Related Products */}
      <div className="lg:col-span-3">
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Customers also purchased
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4">
              {products.loading && <Loader />}
              {!products.loading && products?.relatedProducts?.length
                ? products?.relatedProducts?.map((product) => (
                    <Space
                      key={product._id}
                      direction="vertical"
                      size="middle"
                      style={{
                        width: "100%",
                      }}
                    >
                      <Badge.Ribbon
                        text={product.stock >= 1 ? "In Stock" : "Out Of Stock"}
                        color={product.stock >= 1 ? "green" : "red"}
                      >
                        <div className="relative">
                          <Link to={`/product-details/${product._id}`}>
                            <div className="group border-2 border-solid border-black p-[1px] rounded-lg">
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
                                    {product.rating || 4.5}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Link>
                          <div
                            onClick={() =>
                              handleAddToWishlistClick(product._id)
                            }
                            className="py-1 mt-1 flex justify-center items-center space-x-4 rounded-lg bg-sky-800 text-white hover:cursor-pointer hover:bg-sky-900 active:bg-sky-800"
                          >
                            <span>{"Add To Wishlist"}</span> <TbJewishStar />
                          </div>
                        </div>
                      </Badge.Ribbon>
                    </Space>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
