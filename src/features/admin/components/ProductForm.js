import React, { useReducer, useState } from "react";

const ProductForm = () => {
  const initialState = {
    selectedThumbnail: null,
    selectedImage1: null,
    selectedImage2: null,
    selectedImage3: null,
    selectedImage4: null,
  };

  const selectedImagesReducer = (state, action) => {
    switch (action.type) {
      case "ADD_IMAGE":
        return { ...state, [action.key]: action.value };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(selectedImagesReducer, initialState);
  console.log(state);

  const handleAddImage = (key, value) => {
    dispatch({ type: "ADD_IMAGE", key, value });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8  py-5">
      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="rounded-sm shadow-gray-400 shadow-lg text-center text-white text-xl font-serif font-bold py-2 tracking-widest leading-7  bg-gray-700">
              Add Product
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Brand
                </label>
                <div className="mt-2">
                  <select
                    id="brand"
                    name="brand"
                    autoComplete="brand"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category
                </label>
                <div className="mt-2">
                  <select
                    id="category"
                    name="category"
                    autoComplete="category"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-6 space-y-1">
                <div className="flex justify-center">
                  {state.selectedThumbnail && (
                    <img
                      className="h-52 w-52"
                      src={URL.createObjectURL(state.selectedThumbnail)}
                      alt="product"
                    />
                  )}
                </div>
                <label
                  htmlFor="productThumbnail"
                  className="hover:cursor-pointer rounded-lg hover:bg-blue-900 active:bg-blue-800 bg-blue-800 block py-2 text-center text-white "
                >
                  {state.selectedThumbnail
                    ? state.selectedThumbnail.name
                    : "Upload Image For Product Thumbnail"}
                  <input
                    id="productThumbnail"
                    name="productThumbnail"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) =>
                      handleAddImage("selectedThumbnail", e.target.files[0])
                    }
                  />
                </label>
              </div>

              <div className="sm:col-span-3 space-y-1">
                <div className="flex justify-center">
                  {state.selectedImage1 && (
                    <img
                      className="h-52 w-52"
                      src={URL.createObjectURL(state.selectedImage1)}
                      alt="product"
                    />
                  )}
                </div>
                <label
                  htmlFor="productImg1"
                  className="hover:cursor-pointer rounded-lg hover:bg-blue-900 active:bg-blue-800 bg-blue-800 block py-2 text-center text-white "
                >
                  {state.selectedImage1
                    ? state.selectedImage1.name
                    : "Upload Image-1 For Product showcase"}
                  <input
                    id="productImg1"
                    name="productImg1"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) =>
                      handleAddImage("selectedImage1", e.target.files[0])
                    }
                  />
                </label>
              </div>

              <div className="sm:col-span-3 space-y-1">
                <div className="flex justify-center">
                  {state.selectedImage2 && (
                    <img
                      className="h-52 w-52"
                      src={URL.createObjectURL(state.selectedImage2)}
                      alt="product"
                    />
                  )}
                </div>
                <label
                  htmlFor="productImg2"
                  className="hover:cursor-pointer rounded-lg hover:bg-blue-900 active:bg-blue-800 bg-blue-800 block py-2 text-center text-white "
                >
                  {state.selectedImage2
                    ? state.selectedImage2.name
                    : "Upload Image-2 For Product showcase"}
                  <input
                    id="productImg2"
                    name="productImg2"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) =>
                      handleAddImage("selectedImage2", e.target.files[0])
                    }
                  />
                </label>
              </div>

              <div className="sm:col-span-3 space-y-1">
                <div className="flex justify-center">
                  {state.selectedImage3 && (
                    <img
                      className="h-52 w-52"
                      src={URL.createObjectURL(state.selectedImage3)}
                      alt="product"
                    />
                  )}
                </div>
                <label
                  htmlFor="productImg3"
                  className="hover:cursor-pointer rounded-lg hover:bg-blue-900 active:bg-blue-800 bg-blue-800 block py-2 text-center text-white "
                >
                  {state.selectedImage3
                    ? state.selectedImage3.name
                    : "Upload Image-3 For Product showcase"}
                  <input
                    id="productImg3"
                    name="productImg3"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) =>
                      handleAddImage("selectedImage3", e.target.files[0])
                    }
                  />
                </label>
              </div>

              <div className="sm:col-span-3 space-y-1">
                <div className="flex justify-center">
                  {state.selectedImage4 && (
                    <img
                      className="h-52 w-52"
                      src={URL.createObjectURL(state.selectedImage4)}
                      alt="product"
                    />
                  )}
                </div>
                <label
                  htmlFor="productImg4"
                  className="hover:cursor-pointer rounded-lg hover:bg-blue-900 active:bg-blue-800 bg-blue-800 block py-2 text-center text-white "
                >
                  {state.selectedImage4
                    ? state.selectedImage4.name
                    : "Upload Image-4 For Product showcase"}
                  <input
                    id="productImg4"
                    name="productImg4"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) =>
                      handleAddImage("selectedImage4", e.target.files[0])
                    }
                  />
                </label>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-full">
                    <input
                      type="text"
                      name="productName"
                      id="productName"
                      autoComplete="productName"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Redmi Note 5 Pro"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="Description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="Description"
                    name="Description"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about Product.
                </p>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="price"
                    id="price"
                    autoComplete="price"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="discountPercent"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  discount Percentage
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="discountPercent"
                    id="discountPercent"
                    autoComplete="discountPercent"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Stock
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="stock"
                    id="stock"
                    autoComplete="stock"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Extra. See If these can be used */}
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Notifications
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              We'll always let you know about important changes, but you pick
              what else you want to hear about.
            </p>

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  By Email
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-900"
                      >
                        Comments
                      </label>
                      <p className="text-gray-500">
                        Get notified when someones posts a comment on a posting.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="candidates"
                        className="font-medium text-gray-900"
                      >
                        Candidates
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate applies for a job.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="offers"
                        className="font-medium text-gray-900"
                      >
                        Offers
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate accepts or rejects an
                        offer.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  Push Notifications
                </legend>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  These are delivered via SMS to your mobile phone.
                </p>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-everything"
                      name="push-notifications"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="push-everything"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Everything
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-email"
                      name="push-notifications"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="push-email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Same as email
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-nothing"
                      name="push-notifications"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="push-nothing"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      No push notifications
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;

// {
//   "id": 1,
//   "title": "iPhone 9",
//   "description": "An apple mobile which is nothing like apple",
//   "price": 549,
//   "discountPercentage": 12.96,
//   "rating": 4.69,
//   "stock": 94,
//   "brand": "Apple",
//   "category": "smartphones",
//   "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
//   "images": [
//     "https://i.dummyjson.com/data/products/1/1.jpg",
//     "https://i.dummyjson.com/data/products/1/2.jpg",
//     "https://i.dummyjson.com/data/products/1/3.jpg",
//     "https://i.dummyjson.com/data/products/1/4.jpg",
//     "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
//   ]
// },
