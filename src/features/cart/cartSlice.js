import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserCart } from "./cartAPI";

const initialState = {
  loading: false,
  items: [],
  error: null,
};

export const fetchUserCartAsync = createAsyncThunk(
  "cart/fetchUserCart",
  async (uId) => {
    const response = await fetchUserCart(uId);
    return response.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      });
  },
});

export default cartSlice.reducer;
