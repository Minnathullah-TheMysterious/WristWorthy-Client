import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPromoAsync } from "./promoSlice";
import { PRODUCT_LIMIT_PER_PAGE_FOR_USER } from "../../app/constants";
import { fetchAllProductsByFiltersAsync } from "../products/productSlice";

const Promo = () => {
  const dispatch = useDispatch();
  const promo = useSelector((state) => state?.promo?.item);

  console.log(promo);

  useEffect(() => {
    dispatch(fetchPromoAsync());
  }, [dispatch]);

  //filter = {category:['smartphones', 'laptops'], brand:['apple', 'samsung'], lowerPriceLimit: [number], higherPriceLimit: [number]}
  //sort = {_sort: 'price', _order: 'desc'}
  //pagination = {_page: 1, _limit: 10}

  const filter = {};
  const sort = {};
  const pagination = { _page: 1, _limit: PRODUCT_LIMIT_PER_PAGE_FOR_USER };

  if (promo?.brand) {
    filter.brand = [promo?.brand?._id];
  }

  if (promo?.category) {
    filter.category = [promo?.category?._id];
  }

  const handleShopCollectionClick = () => {
    window.scrollTo({ top: 1100, behavior: "smooth" });
    dispatch(fetchAllProductsByFiltersAsync({ filter, sort, pagination }));
  };

  return promo ? (
    <div className="relative overflow-hidden bg-gray-500 py-36">
      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-white text-4xl font-bold tracking-tight font-serif sm:text-6xl">
              {promo.promo_heading}
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              This year, our new summer collection will shelter you from the
              harsh elements of a world that doesn't care if you live or die.
            </p>
          </div>
          {/* Image Gallery */}
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <img
                          src={promo?.images[0]?.location}
                          alt={
                            promo.category
                              ? promo?.category?.category_name
                              : promo?.brand?.brand_name
                          }
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src={promo?.images[1]?.location}
                          alt={
                            promo.category
                              ? promo?.category?.category_name
                              : promo?.brand?.brand_name
                          }
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src={promo?.images[2]?.location}
                          alt={
                            promo.category
                              ? promo?.category?.category_name
                              : promo?.brand?.brand_name
                          }
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src={promo?.images[3]?.location}
                          alt={
                            promo.category
                              ? promo?.category?.category_name
                              : promo?.brand?.brand_name
                          }
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src={promo?.images[4]?.location}
                          alt={
                            promo.category
                              ? promo?.category?.category_name
                              : promo?.brand?.brand_name
                          }
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src={promo?.images[5]?.location}
                          alt={
                            promo.category
                              ? promo?.category?.category_name
                              : promo?.brand?.brand_name
                          }
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src={promo?.images[6]?.location}
                          alt={
                            promo.category
                              ? promo?.category?.category_name
                              : promo?.brand?.brand_name
                          }
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleShopCollectionClick()}
                className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
              >
                Shop Collection
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Promo;
