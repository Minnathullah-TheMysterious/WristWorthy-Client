import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { placeOrder } from "./orderAPI";

const initialState = {
  loading: false,
  orders: [],
  error: null,
};

export const placeOrderAsync = createAsyncThunk(
  "order/placeOrder",
  async (order) => {
    try {
      const response = await placeOrder(order);
      console.log(response)
      return response;
    } catch (error) {
      console.error("Something Went Wrong in place-order-thunk", error);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrderAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(placeOrderAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(placeOrderAsync.fulfilled, (state, action) => {
        state.loading = false;
        state?.items?.push(action.payload);
      });
  },
});

export default orderSlice.reducer;
