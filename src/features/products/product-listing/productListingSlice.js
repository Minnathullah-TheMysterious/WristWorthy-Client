import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchProductsByFilters,
} from "./productListingAPI";

const initialState = {
  loading: false,
  products: [],
  error: "",
};

export const fetchFilteredProductsAsync = createAsyncThunk(
  "products/fetchFilteredProducts",
  async ({ filter, sort, pageNum, productLimitPerPage }) => {
    const data = await fetchProductsByFilters(
      filter,
      sort,
      pageNum,
      productLimitPerPage
    );
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
        state.error = action.error.message;
      })
      .addCase(fetchFilteredProductsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = "";
      });
  },
});

export default productListingSlice.reducer;
