import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProductsByFilters } from "./productListingAPI";

const initialState = {
  loading: false,
  products: [],
  totalProductsCount: 0,
  error: "",
};

export const fetchFilteredProductsAsync = createAsyncThunk(
  "products/fetchFilteredProducts",
  async ({ filter, sort, pagination }) => {
    const data = await fetchProductsByFilters(filter, sort, pagination);
    console.log(data)
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
      });
  },
});

export default productListingSlice.reducer;
