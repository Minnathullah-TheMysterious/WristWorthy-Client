import axios from "axios";
import toast from "react-hot-toast";

export const fetchAllProductsByFilters = async (filter, sort, pagination) => {
  //filter = {category:['smartphones', 'laptops'], brand:['apple', 'samsung'], lowerPriceLimit: [number], higherPriceLimit: [number]}
  //sort = {_sort: 'price', _order: 'desc'}
  //pagination = {_page: 1, _limit: 10}

  const filterQueryString = Object.entries(filter)
    .map(([key, values]) => values.map((value) => `${key}=${value}`))
    .flat()
    .join("&");

  //add ampersand at the end of the filter query string if string presents
  let filterQueryStringWithAmpersandEnd = "";
  if (filterQueryString.length !== 0) {
    filterQueryStringWithAmpersandEnd = `${filterQueryString}&`;
  }

  let sortingQueryString = "";
  for (const key in sort) {
    const sortingValue = sort[key];
    sortingQueryString = sortingQueryString + `${key}=${sortingValue}&`;
  }

  let paginationQueryString = "";
  for (const key in pagination) {
    const paginationValue = pagination[key];
    paginationQueryString =
      paginationQueryString + `${key}=${paginationValue}&`;
  }

  const filteredProductsAPI = `/api/v1/product/get-filtered-products?${paginationQueryString}${filterQueryStringWithAmpersandEnd}${sortingQueryString}`;

  //Remove ampersand at the end of the string
  const slicedFilteredProductsAPI = filteredProductsAPI.slice(0, -1);

  try {
    const { data } = await axios.get(slicedFilteredProductsAPI);
    const { success } = data;
    if (success) {
      // toast.success(message);
      return data;
    }
  } catch (error) {
    toast.error(error.message);
    throw new Error({ success: false, error: error.message });
  }
};

export const fetchCategories = async () => {
  try {
    const { data } = await axios.get("/api/v1/category/get-all-categories");
    return data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const fetchBrands = async () => {
  try {
    const { data } = await axios.get("/api/v1/brand/get-all-brands");
    return data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const fetchSelectedProduct = async (productId) => {
  try {
    const { data } = await axios.get(
      `/api/v1/product/get-selected-product/${productId}`
    );
    const { success, message, selectedProduct } = data;

    if (success) {
      return selectedProduct;
    }

    toast.error(message);
    return data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      toast.error(error?.response?.data?.message);
      return { success: false, message: error?.response?.data?.message };
    }

    toast.error(
      error?.response?.data?.message ||
        "Something Went Wrong while fetching the selected product"
    );
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "Something Went Wrong while fetching the selected product",
    };
  }
};

export const fetchRelatedProducts = async (categoryId, productId) => {
  try {
    const { data } = await axios.get(
      `/api/v1/product/get-related-products/${categoryId}/${productId}`
    );
    const { success, message } = data;

    if (success) {
      return data;
    }

    toast.error(message);
    return data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      toast.error(error?.response?.data?.message);
      return { success: false, message: error?.response?.data?.message };
    }

    toast.error(
      error?.response?.data?.message ||
        "Something Went Wrong while fetching the related products"
    );
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "Something Went Wrong while fetching the related products",
    };
  }
};

export const searchProducts = async (product) => {
  try {
    const { data } = await axios.get(
      `/api/v1/product/search-product/${product}`
    );
    const { success, message } = data;

    if (success) {
      return data;
    }

    toast.error(message);
    return data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      toast.error(error?.response?.data?.message);
      return { success: false, message: error?.response?.data?.message };
    }

    toast.error(
      error?.response?.data?.message ||
        "Something Went Wrong while searching the products"
    );
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "Something Went Wrong while searching the products",
    };
  }
};

export const updateProductStock = async (productId, productQuantity) => {
  try {
    const { data } = await axios.put(
      `/api/v1/product/user/update-product-stock/${productId}/${productQuantity}`
    );
    return data;
  } catch (error) {
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error.message ||
        error ||
        "Something Went Wrong while updating product stock",
    };
  }
};
