import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllOrders, placeOrder } from "./userAPI";

const initialState = {
  loading: false,
  orders: [],
  currentOrder: null,
  error: null,
};
//we may need more info of current order

export const fetchAllOrdersAsync = createAsyncThunk(
  "order/fetchAllOrders",
  async (userId) => {
    try {
      const response = await fetchAllOrders(userId);
      return response;
    } catch (error) {
      console.error("Something Went Wrong in place-order-thunk", error);
    }
  }
);

export const placeOrderAsync = createAsyncThunk(
  "order/placeOrder",
  async ({userId, order}) => {
    try {
      const response = await placeOrder(userId,order);
      console.log(response);
      return response
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
        state?.orders?.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllOrdersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload
      })
  },
});

export default orderSlice.reducer;
