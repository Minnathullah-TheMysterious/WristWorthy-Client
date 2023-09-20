import React from "react";
import { useSelector } from "react-redux";

const CategoryListing = () => {
  const categories = useSelector((state) => state?.product?.categories);
  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-3 sm:py-2 lg:max-w-none lg:py-4">
          <h2 className="text-2xl font-bold text-gray-900 font-serif">
            Categories
          </h2>

          <div className="mt-6 space-y-2 lg:grid lg:grid-cols-6 lg:gap-x-6 sm:grid sm:grid-cols-3 sm:gap-x-3 grid grid-cols-2 gap-x-2  md:grid md:grid-cols-4 md:gap-x-4">
            {categories.map((category) => (
              <div key={category._id} className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                  <img
                    src={`${process.env.REACT_APP_API}/${category.image.location}`}
                    alt={category.category_name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-6 text-sm text-gray-800 font-serif font-bold">
                  {category.category_name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryListing;
