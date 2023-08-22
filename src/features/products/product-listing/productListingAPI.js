import axios from "axios";//////////////////////////
export const fetchProductsByFilters = async (
  filter,
  sort,
  pagination
) => {

  //filter = {category:['smartphones', 'laptops'], brand:['apple', 'samsung']}
  //sort = {_sort: 'price', _order: 'desc'}
  //pagination = {_page: 1, _limit: 10}

  console.log("filter object: ", filter);

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
    paginationQueryParams = paginationQueryParams + `${key}=${paginationValue}&`;
  }
  console.log("Sorting Query Params: ", paginationQueryParams);

  const filteredProductsAPI = `http://localhost:5000/products?${paginationQueryParams}&${filterQueryParams}&${sortingQueryParams}`;

  try {
    const response = await fetch(filteredProductsAPI);
    const data = await response.json();
    console.log(data);
    const totalProductsCount = response.headers.get('X-Total-Count')
    console.log('Total Product:', totalProductsCount)
    return {data:{products: data, totalProductsCount: +totalProductsCount}};
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    throw error;
  }
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
