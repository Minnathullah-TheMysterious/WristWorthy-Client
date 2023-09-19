import axios from "axios";
import toast from "react-hot-toast";

export const fetchProductsByFilters = async (filter, sort, pagination) => {
  //filter = {category:['smartphones', 'laptops'], brand:['apple', 'samsung']}
  //sort = {_sort: 'price', _order: 'desc'}
  //pagination = {_page: 1, _limit: 10}

  console.log(filter, sort, pagination);

  const filterQueryParams = Object.entries(filter)
    .map(([key, values]) => values.map((value) => `${key}=${value}`))
    .flat()
    .join("&");

  console.log("Filter Query Params: ", filterQueryParams);

  let sortingQueryParams = "";
  for (const key in sort) {
    const sortingValue = sort[key];
    sortingQueryParams = sortingQueryParams + `${key}=${sortingValue}&`;
  }
  console.log("Sorting Query Params: ", sortingQueryParams);

  let paginationQueryParams = "";
  for (const key in pagination) {
    const paginationValue = pagination[key];
    paginationQueryParams =
      paginationQueryParams + `${key}=${paginationValue}&`;
  }
  console.log("Pagination Query Params: ", paginationQueryParams);

  const filteredProductsAPI = `http://localhost:5000/products?${paginationQueryParams}&${filterQueryParams}&${sortingQueryParams}`;

  try {
    const response = await fetch(filteredProductsAPI);
    const data = await response.json();
    const totalProductsCount = response.headers.get("X-Total-Count");
    return {
      data: { products: data, totalProductsCount: +totalProductsCount },
    };
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    throw error;
  }
};

////products are coming from backend
export const fetchAllProductsByFilters = async (filter, sort, pagination) => {
  //filter = {category:['smartphones', 'laptops'], brand:['apple', 'samsung'], lowerPriceLimit: [number], higherPriceLimit: [number]}
  //sort = {_sort: 'price', _order: 'desc'}
  //pagination = {_page: 1, _limit: 10}

  console.log(filter, sort, pagination);

  const filterQueryParams = Object.entries(filter)
    .map(([key, values]) => values.map((value) => `${key}=${value}`))
    .flat()
    .join("&");

  console.log("Filter Query Params: ", filterQueryParams);

  let sortingQueryParams = "";
  for (const key in sort) {
    const sortingValue = sort[key];
    sortingQueryParams = sortingQueryParams + `${key}=${sortingValue}&`;
  }
  console.log("Sorting Query Params: ", sortingQueryParams);

  let paginationQueryParams = "";
  for (const key in pagination) {
    const paginationValue = pagination[key];
    paginationQueryParams =
      paginationQueryParams + `${key}=${paginationValue}&`;
  }
  console.log("Pagination Query Params: ", paginationQueryParams);

  const filteredProductsAPI = `/api/v1/product/get-filtered-products?${paginationQueryParams}&${filterQueryParams}&${sortingQueryParams}`;

  try {
    const { data } = await axios.get(filteredProductsAPI);
    const { success } = data;
    if (success) {
      // toast.success(message);
      return data;
    }
  } catch (error) {
    toast.error(error.message);
    console.error("Error fetching filtered products:", error);
    throw new Error({ success: false, error: error.message });
  }
};

//products are coming from backend
export const fetchAllProducts = async () => {
  try {
    const { data } = await axios.get("/api/v1/product/get-all-products");
    const { success } = data;
    if (success) {
      console.log("products fetched successfully");
      return data;
    }
  } catch (error) {
    console.error("Something Went Wrong While fetching all products", error);
  }
};

export const fetchCategories = async () => {
  const URL = "http://localhost:5000/categories";
  const response = await axios.get(URL);
  return response.data;
};

//backend.
export const fetchMyCategories = async () => {
  try {
    const { data } = await axios.get("/api/v1/category/get-all-categories");
    console.log(data);
    return data;
  } catch (error) {
    console.error(
      "Something Went Wrong in fetching the categories - client",
      error
    );
  }
};

export const fetchBrands = async () => {
  const URL = "http://localhost:5000/brands";
  const response = await axios.get(URL);
  return response.data;
};

//backend.
export const fetchMyBrands = async () => {
  try {
    const { data } = await axios.get("/api/v1/brand/get-all-brands");
    console.log(data);
    return data;
  } catch (error) {
    console.error(
      "Something Went Wrong in fetching the brands - client",
      error
    );
  }
};

export const fetchPrices = async () => {
  const URL = "http://localhost:5000/prices";
  const response = await axios.get(URL);
  return response.data;
};

export const fetchSelectedProduct = async (id) => {
  const URL = `http://localhost:5000/products/${id}`;
  const response = await axios.get(URL);
  const product = response.data;
  return product;
};

//Backend
export const fetchMySelectedProduct = async (productId) => {
  try {
    const { data } = await axios.get(
      `/api/v1/product/get-selected-product/${productId}`
    );
    const { success, message, selectedProduct } = data;
    if (success) {
      // toast.success(message);
      return selectedProduct;
    } else {
      toast.error(message);
      return data
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      toast.error(error?.response?.data?.message);
      return { success: false, message: error?.response?.data?.message };
    } else {
      console.error(
        "Something Went Wrong while fetching the selected product",
        error
      );
      toast.error("Something Went Wrong while fetching the selected product");
      return { success: false, message: error?.response?.data?.message };
    }
  }
};

