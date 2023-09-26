import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllFilteredOrders, getOrderDetails } from "./adminAPI";

const initialState = {
  loading: false,
  orderDetails: null,
  allOrders: [],
  ordersCount: 0,
  error: null,
};

export const getAllFilteredOrdersAsync = createAsyncThunk(
  "orders/getAllFilteredOrders",
  async (ordersQueryString) => {
    try {
      const response = await getAllFilteredOrders(ordersQueryString);
      if (response) {
        return { orders: response.orders, ordersCount: response.ordersCount };
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      throw new Error(error?.message);
    }
  }
);

export const getOrderDetailsAsync = createAsyncThunk(
  "orders/getOrderDetails",
  async (orderId) => {
    try {
      const response = await getOrderDetails(orderId);
      if (response) {
        return response.order;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      throw new Error(error?.message);
    }
  }
);

const adminSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllFilteredOrdersAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllFilteredOrdersAsync.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getAllFilteredOrdersAsync.fulfilled, (state, action) => {
        state.allOrders = action.payload.orders;
        state.ordersCount = action.payload.ordersCount;
      })

      .addCase(getOrderDetailsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderDetailsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getOrderDetailsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      });
  },
});

export default adminSlice.reducer;
