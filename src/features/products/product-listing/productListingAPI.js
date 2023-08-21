import axios from "axios";

//////////////////////////
export const fetchProductsByFilters = async (
  filter,
  sort,
  pageNum,
  productLimitPerPage
) => {
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
    console.log(sortingQueryParams);
  }

  console.log('Sorting Query Params: ',sortingQueryParams)

  const filteredProductsAPI = `http://localhost:5000/products?_page=${pageNum}&_limit=${productLimitPerPage}&${filterQueryParams}&${sortingQueryParams}`;

  try {
    const response = await fetch(filteredProductsAPI);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    throw error;
  }
};

export const totalProductsCount = async () => {
  const totalProductsCountAPI = "http://localhost:5000/total";
  try {
    const { data } = await axios.get(totalProductsCountAPI);
    console.log(`product count: ${data}`);
    return data;
  } catch (error) {
    console.error(`Something went wrong while fetching the products`, error);
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
