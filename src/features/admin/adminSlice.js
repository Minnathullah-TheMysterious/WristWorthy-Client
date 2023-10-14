import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllFilteredOrders,
  getOrderDetails,
  updateOrderPaymentStatus,
  updateOrderStatus,
} from "./adminAPI";

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

export const updateOrderStatusAsync = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ orderId, orderStatus }) => {
    try {
      const response = await updateOrderStatus(orderId, orderStatus);

      if (response.success) {
        return { order: response.updatedOrder, orderId };
      }

      throw new Error(response.message);
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const updateOrderPaymentStatusAsync = createAsyncThunk(
  "order/updateOrderPaymentStatus",
  async ({ orderId, paymentStatus }) => {
    try {
      const response = await updateOrderPaymentStatus(orderId, paymentStatus);

      if (response.success) {
        return { order: response.updatedOrder, orderId };
      }

      throw new Error(response.message);
    } catch (error) {
      throw new Error(error.message);
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
        state.loading = false;
      })
      .addCase(getAllFilteredOrdersAsync.fulfilled, (state, action) => {
        state.loading = false;
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
      })

      .addCase(updateOrderStatusAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrderStatusAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateOrderStatusAsync.fulfilled, (state, action) => {
        state.loading = false;
        const orderIndex = state?.allOrders?.findIndex(
          (orders) => orders?.order[0]?._id === action.payload.orderId
        );
        if (orderIndex !== -1) {
          state.allOrders.splice(orderIndex, 1, action.payload.order[0]);
        }
      })

      .addCase(updateOrderPaymentStatusAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrderPaymentStatusAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateOrderPaymentStatusAsync.fulfilled, (state, action) => {
        state.loading = false;
        const orderIndex = state?.allOrders?.findIndex(
          (orders) => orders?.order[0]?._id === action.payload.orderId
        );
        if (orderIndex !== -1) {
          state.allOrders.splice(orderIndex, 1, action.payload.order[0]);
        }
      });
  },
});

export default adminSlice.reducer;
