import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { StarIcon } from "@heroicons/react/20/solid";
import { deleteWishListItemAsync, fetchWishListAsync } from "./wishListSlice";

const WishList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state?.auth?.user?._id);
  const wishListItems = useSelector((state) => state.wishList);

  useEffect(() => {
    dispatch(fetchWishListAsync(userId));
  }, [dispatch, userId]);

  const handleDeleteWishListItemClick = (wishListId) => {
    try {
      dispatch(deleteWishListItemAsync(wishListId));
    } catch (error) {
      console.error(
        "Something went wrong while dispatching the deleteWishListItemAsync action"
      );
    }
  };
  return (
    <div className="lg:col-span-3">
      <div className="bg-white">
        <h1 className="font-serif text-center text-5xl shadow py-5">
          Your WishList
        </h1>
        <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4">
            {wishListItems.loading && (
              <p className="text-xl font-bold font-serif">Loading...</p>
            )}
            {!wishListItems.loading && wishListItems.error ? (
              <p>Error: {wishListItems.error}</p>
            ) : null}
            {!wishListItems.loading && wishListItems?.list?.length ? (
              wishListItems?.list?.map((product) => (
                <div key={product.id} className="relative">
                  <Link to={`/product-details/${product.product_id}`}>
                    <div className="group border-2 border-solid border-black p-[2px] rounded-lg">
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
                  <div
                    onClick={() => handleDeleteWishListItemClick(product.id)}
                    className="mt-1 rounded-lg bg-sky-800 py-1 text-white text-center hover:cursor-pointer hover:bg-sky-900 active:bg-sky-800"
                  >
                    Remove From WishList
                  </div>
                </div>
              ))
            ) : (
              <div
                className="font-serif font-bold hover:underline hover:cursor-pointer text-center"
                onClick={() => navigate("/")}
              >
                Please Add To WishList To See Here
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishList;
