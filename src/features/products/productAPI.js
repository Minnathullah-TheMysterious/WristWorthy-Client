import axios from "axios";

export const fetchProductsByFilters = async (filter, sort, pagination) => {
  //filter = {category:['smartphones', 'laptops'], brand:['apple', 'samsung']}
  //sort = {_sort: 'price', _order: 'desc'}
  //pagination = {_page: 1, _limit: 10}

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

export const fetchCategories = async () => {
  const URL = "http://localhost:5000/categories";
  const response = await axios.get(URL);
  return response.data;
};

export const fetchBrands = async () => {
  const URL = "http://localhost:5000/brands";
  const response = await axios.get(URL);
  return response.data;
};

//Brands are coming from my backend.
export const fetchMyBrands = async () => {
  try {
    const { data } = await axios.get("/api/v1/brand/get-all-brands");
    console.log(data)
    return data;
  } catch (error) {
    console.error(
      "Something Went Wrong in fetching the brands - client",
      error
    );
  }
};

//Categories are coming from my backend.
export const fetchMyCategories = async () => {
  try {
    const { data } = await axios.get("/api/v1/category/get-all-categories");
    console.log(data)
    return data;
  } catch (error) {
    console.error(
      "Something Went Wrong in fetching the categories - client",
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

//*******sample data ************** */

// const products = [
//     {
//       id: 1,
//       title: "iPhone 9",
//       description: "An apple mobile which is nothing like apple",
//       price: 549,
//       discountPercentage: 12.96,
//       rating: 4.69,
//       stock: 94,
//       brand: "Apple",
//       category: "smartphones",
//       thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
//       images: [
//         "https://i.dummyjson.com/data/products/1/1.jpg",
//         "https://i.dummyjson.com/data/products/1/2.jpg",
//         "https://i.dummyjson.com/data/products/1/3.jpg",
//         "https://i.dummyjson.com/data/products/1/4.jpg",
//         "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
//       ],
//     },
//     // More products...
//   ];
