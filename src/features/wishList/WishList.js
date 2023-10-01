import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { StarIcon } from "@heroicons/react/20/solid";
import { deleteWishlistItemAsync, fetchWishlistAsync } from "./wishlistSlice";
import Loader from "../../loaders/Loader";
import { DISCOUNTED_PRICE } from "../../app/constants";

const Wishlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state?.auth?.user?._id);
  const wishlistItems = useSelector((state) => state?.wishlist);

  useEffect(() => {
    userId && dispatch(fetchWishlistAsync());
  }, [dispatch, userId]);

  const handleDeleteWishlistItemClick = (productId) => {
    try {
      userId && dispatch(deleteWishlistItemAsync(productId ));
    } catch (error) {
      console.error(
        "Something went wrong while dispatching the deleteWishlistItemAsync action",
        error
      );
    }
  };
  return (
    <div className="lg:col-span-3">
      <div className="bg-white">
        <h1 className="font-serif text-center text-5xl shadow py-5">
          Your Wishlist
        </h1>
        <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4">
            {wishlistItems.loading && <Loader />}
            {/* {!wishlistItems.loading && wishlistItems.error ? (
              <p>Error: {wishlistItems.error}</p>
            ) : null} */}
            {!wishlistItems.loading && wishlistItems?.list ? (
              wishlistItems?.list?.products?.map((product) => (
                <div key={product._id} className="relative">
                  <Link to={`/product-details/${product._id}`}>
                    <div className="group border-2 border-solid border-black p-[2px] rounded-lg">
                      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-80 lg:h-60">
                        <img
                          src={`${process.env.REACT_APP_API}/${product?.thumbnail?.location}`}
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
                            {product.rating}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div
                    onClick={() => handleDeleteWishlistItemClick(product._id)}
                    className="mt-1 rounded-lg bg-sky-800 py-1 text-white text-center hover:cursor-pointer hover:bg-sky-900 active:bg-sky-800"
                  >
                    Remove From Wishlist
                  </div>
                </div>
              ))
            ) : (
              <div
                className="font-serif font-bold hover:underline hover:cursor-pointer text-center"
                onClick={() => navigate("/")}
              >
                Please Add To Wishlist To See Here
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
