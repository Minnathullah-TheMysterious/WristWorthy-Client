import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchBrands, fetchCategories, fetchPrices, fetchProductsByFilters } from "./productListingAPI";

const initialState = {
  loading: false,
  products: [],
  categories: [],
  brands: [],
  prices: [],
  totalProductsCount: 0,
  error: "",
};

export const fetchFilteredProductsAsync = createAsyncThunk(
  "products/fetchFilteredProducts",
  async ({ filter, sort, pagination }) => {
    const data = await fetchProductsByFilters(filter, sort, pagination);
    console.log(data);
    return data;
  }
);

export const fetchCategoriesAsync = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const data = await fetchCategories();
    return data;
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  "products/fetchBrands",
  async () => {
    const data = await fetchBrands();
    return data;
  }
);
export const fetchPricesAsync = createAsyncThunk(
  "products/fetchPrices",
  async () => {
    const data = await fetchPrices();
    return data;
  }
);

const productListingSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredProductsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFilteredProductsAsync.rejected, (state, action) => {
        state.loading = false;
        state.products = [];
        state.totalProductsCount = 0;
        state.error = action.error.message;
      })
      .addCase(fetchFilteredProductsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data.products;
        state.totalProductsCount = action.payload.data.totalProductsCount;
        state.error = "";
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategoriesAsync.rejected, (state, action) => {
        state.loading = false;
        state.categories = [];
        state.error = action.error.message;
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        state.error = "";
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBrandsAsync.rejected, (state, action) => {
        state.loading = false;
        state.brands = [];
        state.error = action.error.message;
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
        state.error = "";
      })
      .addCase(fetchPricesAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPricesAsync.rejected, (state, action) => {
        state.loading = false;
        state.prices = [];
        state.error = action.error.message;
      })
      .addCase(fetchPricesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.prices = action.payload;
        state.error = "";
      })
  },
});

export default productListingSlice.reducer;
