import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductAsync,
  fetchBrandsAsync,
  fetchCategoriesAsync,
} from "../../products/productSlice";

const ProductForm = () => {
  const dispatchAsync = useDispatch();

  const brands = useSelector((state) => state?.product?.brands);
  const categories = useSelector((state) => state?.product?.categories);

  useEffect(() => {
    dispatchAsync(fetchBrandsAsync());
    dispatchAsync(fetchCategoriesAsync());
  }, [dispatchAsync]);

  const initialState = {
    thumbnail: null,
    image_1: null,
    image_2: null,
    image_3: null,
    image_4: null,
    brand: "",
    category: "",
    product_name: "",
    description: "",
    highlight_1: "",
    highlight_2: "",
    highlight_3: "",
    highlight_4: "",
    highlight_5: "",
    price: 0,
    discountPercentage: 0,
    stock: 1,
  };

  const createProductReducer = (state, action) => {
    switch (action.type) {
      case "ADD_PRODUCT":
        return { ...state, [action.key]: action.value };
      case "RESET_FORM":
        return initialState;
      default:
        return state;
    }
  };

  const [productData, dispatch] = useReducer(
    createProductReducer,
    initialState
  );
  console.log(productData);

  const handleFieldChange = (key, value) => {
    dispatch({ type: "ADD_PRODUCT", key, value });
  };

  const handleResetForm = () => {
    dispatch({ type: "RESET_FORM" });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("thumbnail", productData.thumbnail);
    formData.append("image_1", productData.image_1);
    formData.append("image_2", productData.image_2);
    formData.append("image_3", productData.image_3);
    formData.append("image_4", productData.image_4);
    formData.append("brand", productData.brand);
    formData.append("category", productData.category);
    formData.append("product_name", productData.product_name);
    formData.append("description", productData.description);
    formData.append("highlight_1", productData.highlight_1);
    formData.append("highlight_2", productData.highlight_2);
    formData.append("highlight_3", productData.highlight_3);
    formData.append("highlight_4", productData.highlight_4);
    formData.append("highlight_5", productData.highlight_5);
    formData.append("price", productData.price);
    formData.append("discountPercentage", productData.discountPercentage);
    formData.append("stock", productData.stock);
    
    dispatchAsync(createProductAsync(formData))
      .then(() => handleResetForm())
      .catch((err) => console.error(err));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8  py-5">
      <form noValidate onSubmit={(e) => handleFormSubmit(e)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="rounded-sm shadow-gray-400 shadow-lg text-center text-white text-xl font-serif font-bold py-2 tracking-widest leading-7  bg-gray-700">
              Create Product
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
                    onChange={(e) => handleFieldChange("brand", e.target.value)}
                    value={productData.brand}
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
                    id="category"
                    name="category"
                    autoComplete="category"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={productData.category}
                    onChange={(e) =>
                      handleFieldChange("category", e.target.value)
                    }
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

              <div className="sm:col-span-6 space-y-1">
                <div className="flex justify-center">
                  {productData.thumbnail && (
                    <img
                      className="h-52 w-52"
                      src={URL.createObjectURL(productData.thumbnail)}
                      alt="product"
                    />
                  )}
                </div>
                <label
                  htmlFor="productThumbnail"
                  className="hover:cursor-pointer rounded-lg hover:bg-blue-900 active:bg-blue-800 bg-blue-800 block py-2 text-center text-white "
                >
                  {productData.thumbnail
                    ? productData.thumbnail.name
                    : "Upload Image For Product Thumbnail"}
                  <input
                    id="productThumbnail"
                    name="productThumbnail"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) =>
                      handleFieldChange("thumbnail", e.target.files[0])
                    }
                  />
                </label>
              </div>

              <div className="sm:col-span-3 space-y-1">
                <div className="flex justify-center">
                  {productData.image_1 && (
                    <img
                      className="h-52 w-52"
                      src={URL.createObjectURL(productData.image_1)}
                      alt="product"
                    />
                  )}
                </div>
                <label
                  htmlFor="productImg1"
                  className="hover:cursor-pointer rounded-lg hover:bg-blue-900 active:bg-blue-800 bg-blue-800 block py-2 text-center text-white "
                >
                  {productData.image_1
                    ? productData.image_1.name
                    : "Upload Image-1 For Product showcase"}
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
                  {productData.image_2 && (
                    <img
                      className="h-52 w-52"
                      src={URL.createObjectURL(productData.image_2)}
                      alt="product"
                    />
                  )}
                </div>
                <label
                  htmlFor="productImg2"
                  className="hover:cursor-pointer rounded-lg hover:bg-blue-900 active:bg-blue-800 bg-blue-800 block py-2 text-center text-white "
                >
                  {productData.image_2
                    ? productData.image_2.name
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
                  {productData.image_3 && (
                    <img
                      className="h-52 w-52"
                      src={URL.createObjectURL(productData.image_3)}
                      alt="product"
                    />
                  )}
                </div>
                <label
                  htmlFor="productImg3"
                  className="hover:cursor-pointer rounded-lg hover:bg-blue-900 active:bg-blue-800 bg-blue-800 block py-2 text-center text-white "
                >
                  {productData.image_3
                    ? productData.image_3.name
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
                  {productData.image_4 && (
                    <img
                      className="h-52 w-52"
                      src={URL.createObjectURL(productData.image_4)}
                      alt="product"
                    />
                  )}
                </div>
                <label
                  htmlFor="productImg4"
                  className="hover:cursor-pointer rounded-lg hover:bg-blue-900 active:bg-blue-800 bg-blue-800 block py-2 text-center text-white "
                >
                  {productData.image_4
                    ? productData.image_4.name
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
                      onChange={(e) =>
                        handleFieldChange("product_name", e.target.value)
                      }
                      value={productData.product_name}
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
                    onChange={(e) =>
                      handleFieldChange("description", e.target.value)
                    }
                    value={productData.description}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about Product.
                </p>
              </div>

              <div className="sm:col-span-3 sm:col-start-1">
                <label
                  htmlFor="highlights1"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Highlights - 1
                </label>
                <div className="mt-2">
                  <input
                    id="highlights1"
                    name="highlights1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                    onChange={(e) =>
                      handleFieldChange("highlight_1", e.target.value)
                    }
                    value={productData.highlight_1}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="highlights2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Highlights - 2
                </label>
                <div className="mt-2">
                  <input
                    id="highlights2"
                    name="highlights2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                    onChange={(e) =>
                      handleFieldChange("highlight_2", e.target.value)
                    }
                    value={productData.highlight_2}
                  />
                </div>
              </div>

              <div className="sm:col-span-2  sm:col-start-1">
                <label
                  htmlFor="highlights3"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Highlights - 3
                </label>
                <div className="mt-2">
                  <input
                    id="highlights3"
                    name="highlights3"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                    onChange={(e) =>
                      handleFieldChange("highlight_3", e.target.value)
                    }
                    value={productData.highlight_3}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="highlights4"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Highlights - 4
                </label>
                <div className="mt-2">
                  <input
                    id="highlights4"
                    name="highlights4"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                    onChange={(e) =>
                      handleFieldChange("highlight_4", e.target.value)
                    }
                    value={productData.highlight_4}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="highlights5"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Highlights - 5
                </label>
                <div className="mt-2">
                  <input
                    id="highlights5"
                    name="highlights5"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                    onChange={(e) =>
                      handleFieldChange("highlight_5", e.target.value)
                    }
                    value={productData.highlight_5}
                  />
                </div>
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
                    onChange={(e) => handleFieldChange("price", e.target.value)}
                    value={productData.price}
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
                    onChange={(e) =>
                      handleFieldChange("discountPercentage", e.target.value)
                    }
                    value={productData.discountPercentage}
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
                    onChange={(e) => handleFieldChange("stock", e.target.value)}
                    value={productData.stock}
                  />
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

export default ProductForm;
