import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBrandsAsync,
  fetchCategoriesAsync,
} from "../../products/productSlice";
import { createPromoAsync } from "../../promo/promoSlice";
import { useNavigate } from "react-router-dom";

const CreatePromo = () => {
  const dispatchAsync = useDispatch();
  const navigate = useNavigate();

  const brands = useSelector((state) => state?.product?.brands);
  const categories = useSelector((state) => state?.product?.categories);

  const [disabledBrand, setDisabledBrand] = useState(false);
  const [disabledCategory, setDisabledCategory] = useState(false);

  useEffect(() => {
    dispatchAsync(fetchBrandsAsync());
    dispatchAsync(fetchCategoriesAsync());
  }, [dispatchAsync]);

  const initialState = {
    image_1: null,
    image_2: null,
    image_3: null,
    image_4: null,
    image_5: null,
    image_6: null,
    image_7: null,
    brand: "",
    category: "",
    promo_heading: "",
  };

  const createPromoReducer = (state, action) => {
    switch (action.type) {
      case "CREATE_PROMO":
        return { ...state, [action.key]: action.value };
      case "RESET_FORM":
        return initialState;
      default:
        return state;
    }
  };

  const [promoData, dispatch] = useReducer(createPromoReducer, initialState);

  const handleFieldChange = (key, value) => {
    dispatch({ type: "CREATE_PROMO", key, value });
  };

  const handleResetForm = () => {
    dispatch({ type: "RESET_FORM" });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image_1", promoData.image_1);
    formData.append("image_2", promoData.image_2);
    formData.append("image_3", promoData.image_3);
    formData.append("image_4", promoData.image_4);
    formData.append("image_5", promoData.image_5);
    formData.append("image_6", promoData.image_6);
    formData.append("image_7", promoData.image_7);
    formData.append("promo_heading", promoData.promo_heading);
    if (!promoData.brand || !promoData.brand.length || promoData.brand === "") {
      formData.append("category", promoData.category);
    }
    if (
      !promoData.category ||
      !promoData.category.length ||
      promoData.category === ""
    ) {
      formData.append("brand", promoData.brand);
    }

    dispatchAsync(createPromoAsync(formData))
      .then(() => {
        handleResetForm();
        navigate("/");
      })
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8  py-5">
      <form noValidate onSubmit={(e) => handleFormSubmit(e)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="rounded-sm shadow-gray-400 shadow-lg text-center text-white text-xl font-serif font-bold py-2 tracking-widest leading-7  bg-gray-700">
              Create Promo
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
                    disabled={disabledBrand}
                    id="brand"
                    name="brand"
                    autoComplete="brand"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => {
                      handleFieldChange("brand", e.target.value);
                      setDisabledCategory(true);
                    }}
                    value={promoData.brand}
                  >
                    <option className="text-center">--Select Brand--</option>
                    {brands?.map((brand) => (
                      <option key={brand._id} value={brand._id}>
                        {brand.brand_name}
                      </option>
                    ))}
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
                    disabled={disabledCategory}
                    id="category"
                    name="category"
                    autoComplete="category"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={promoData.category}
                    onChange={(e) => {
                      handleFieldChange("category", e.target.value);
                      setDisabledBrand(true);
                    }}
                  >
                    <option className="text-center">--Select Category--</option>
                    {categories?.map((myCategory) => (
                      <option key={myCategory._id} value={myCategory._id}>
                        {myCategory.category_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3 space-y-1">
                <div className="flex justify-center">
                  {promoData.image_1 && (
                    <img
                      className="h-52 w-52"
                      src={URL.createObjectURL(promoData.image_1)}
                      alt="product"
                    />
                  )}
                </div>
                <label
                  htmlFor="productImg1"
                  className="hover:cursor-pointer rounded-lg hover:bg-blue-900 active:bg-blue-800 bg-blue-800 block py-2 text-center text-white "
                >
                  {promoData.image_1
                    ? promoData.image_1.name
                    : "Upload Image-1 For Promo showcase"}
                  <input
                    id="productImg1"
                    name="productImg1"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) =>
                      handleFieldChange("image_1", e.target.files[0])
                    }
                  />
                </label>
              </div>

              <div className="sm:col-span-3 space-y-1">
                <div className="flex justify-center">
                  {promoData.image_2 && (
                    <img
                      className="h-52 w-52"
                      src={URL.createObjectURL(promoData.image_2)}
                      alt="product"
                    />
                  )}
                </div>
                <label
                  htmlFor="productImg2"
                  className="hover:cursor-pointer rounded-lg hover:bg-blue-900 active:bg-blue-800 bg-blue-800 block py-2 text-center text-white "
                >
                  {promoData.image_2
                    ? promoData.image_2.name
                    : "Upload Image-2 For Product showcase"}
                  <input
                    id="productImg2"
                    name="productImg2"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) =>
                      handleFieldChange("image_2", e.target.files[0])
                    }
                  />
                </label>
              </div>

              <div className="sm:col-span-3 space-y-1">
                <div className="flex justify-center">
                  {promoData.image_3 && (
                    <img
                      className="h-52 w-52"
                      src={URL.createObjectURL(promoData.image_3)}
                      alt="product"
                    />
                  )}
                </div>
                <label
                  htmlFor="productImg3"
                  className="hover:cursor-pointer rounded-lg hover:bg-blue-900 active:bg-blue-800 bg-blue-800 block py-2 text-center text-white "
                >
                  {promoData.image_3
                    ? promoData.image_3.name
                    : "Upload Image-3 For Product showcase"}
                  <input
                    id="productImg3"
                    name="productImg3"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) =>
                      handleFieldChange("image_3", e.target.files[0])
                    }
                  />
                </label>
              </div>

              <div className="sm:col-span-3 space-y-1">
                <div className="flex justify-center">
                  {promoData.image_4 && (
                    <img
                      className="h-52 w-52"
                      src={URL.createObjectURL(promoData.image_4)}
                      alt="product"
                    />
                  )}
                </div>
                <label
                  htmlFor="productImg4"
                  className="hover:cursor-pointer rounded-lg hover:bg-blue-900 active:bg-blue-800 bg-blue-800 block py-2 text-center text-white "
                >
                  {promoData.image_4
                    ? promoData.image_4.name
                    : "Upload Image-4 For Product showcase"}
                  <input
                    id="productImg4"
                    name="productImg4"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) =>
                      handleFieldChange("image_4", e.target.files[0])
                    }
                  />
                </label>
              </div>

              <div className="sm:col-span-3 space-y-1">
                <div className="flex justify-center">
                  {promoData.image_5 && (
                    <img
                      className="h-52 w-52"
                      src={URL.createObjectURL(promoData.image_5)}
                      alt="product"
                    />
                  )}
                </div>
                <label
                  htmlFor="productImg5"
                  className="hover:cursor-pointer rounded-lg hover:bg-blue-900 active:bg-blue-800 bg-blue-800 block py-2 text-center text-white "
                >
                  {promoData.image_5
                    ? promoData.image_5.name
                    : "Upload Image-5 For Product showcase"}
                  <input
                    id="productImg5"
                    name="productImg5"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) =>
                      handleFieldChange("image_5", e.target.files[0])
                    }
                  />
                </label>
              </div>

              <div className="sm:col-span-3 space-y-1">
                <div className="flex justify-center">
                  {promoData.image_6 && (
                    <img
                      className="h-52 w-52"
                      src={URL.createObjectURL(promoData.image_6)}
                      alt="product"
                    />
                  )}
                </div>
                <label
                  htmlFor="productImg6"
                  className="hover:cursor-pointer rounded-lg hover:bg-blue-900 active:bg-blue-800 bg-blue-800 block py-2 text-center text-white "
                >
                  {promoData.image_6
                    ? promoData.image_6.name
                    : "Upload Image-6 For Product showcase"}
                  <input
                    id="productImg6"
                    name="productImg6"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) =>
                      handleFieldChange("image_6", e.target.files[0])
                    }
                  />
                </label>
              </div>

              <div className="sm:col-span-3 space-y-1">
                <div className="flex justify-center">
                  {promoData.image_7 && (
                    <img
                      className="h-52 w-52"
                      src={URL.createObjectURL(promoData.image_7)}
                      alt="product"
                    />
                  )}
                </div>
                <label
                  htmlFor="productImg7"
                  className="hover:cursor-pointer rounded-lg hover:bg-blue-900 active:bg-blue-800 bg-blue-800 block py-2 text-center text-white "
                >
                  {promoData.image_7
                    ? promoData.image_7.name
                    : "Upload Image-7 For Product showcase"}
                  <input
                    id="productImg7"
                    name="productImg7"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) =>
                      handleFieldChange("image_7", e.target.files[0])
                    }
                  />
                </label>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="promo_heading"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Promo Heading
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-full">
                    <input
                      type="text"
                      name="promo_heading"
                      id="promo_heading"
                      autoComplete="promo_heading"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Buy Your Favorite Smart Phones From Your Favorite Categories"
                      onChange={(e) =>
                        handleFieldChange("promo_heading", e.target.value)
                      }
                      value={promoData.promo_heading}
                    />
                  </div>
                </div>
              </div>
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
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePromo;
