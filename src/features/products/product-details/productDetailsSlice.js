import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchSelectedProduct } from "./productDetailsAPI";

const initialState = {
  loading: false,
  selectedProduct: null,
  error: "",
};

export const fetchSelectedProductsAsync = createAsyncThunk(
  "selectedProduct/fetchSelectedProduct",
  async (id) => {
    const product = await fetchSelectedProduct(id);
    console.log(product);
    return product;
  }
);

const productDetailsSlice = createSlice({
  name: "selectedProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSelectedProductsAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSelectedProductsAsync.rejected, (state, action) => {
      state.loading = false;
      state.selectedProduct = null;
      state.error = action.error.message;
    });
    builder.addCase(fetchSelectedProductsAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedProduct = action.payload;
      state.error = "";
    });
  },
});

export default productDetailsSlice.reducer
