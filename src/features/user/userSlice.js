import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteUserAddress,
  getUser,
  addUserAddress,
  updateUserAddress,
  placeOrder,
  fetchUserOrders,
  cancelOrder,
} from "./userAPI";

const initialState = {
  loading: false,
  userInfo: null,
  selectedUserAddress: null,
  orders: [],
  currentOrder: null,
  error: null,
};
//we may need more info of current order

export const getUserAsync = createAsyncThunk("auth/getUser", async () => {
  try {
    const response = await getUser();
    return response;
  } catch (error) {
    console.error("Something went wrong in get-user thunk", error);
  }
});

export const addUserAddressAsync = createAsyncThunk(
  "auth/addUserAddress",
  async (addressData) => {
    try {
      const response = await addUserAddress(addressData);
      if (response.success) {
        console.log(response?.user?.addresses);
        return response?.user?.addresses;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("Something Went Wrong in Add-Address-User Thunk", error);
      throw new Error(error);
    }
  }
);

export const deleteUserAddressAsync = createAsyncThunk(
  "auth/deleteUserAddress",
  async (addressId) => {
    try {
      const response = await deleteUserAddress(addressId);
      return response;
    } catch (error) {
      console.error("Something went wrong in delete-user-address thunk", error);
    }
  }
);

export const updateUserAddressAsync = createAsyncThunk(
  "auth/updateUserAddress",
  async ({ addressId, addressData }) => {
    console.log(`address_id: ${addressId} \naddress_data: ${addressData}`);
    try {
      const response = await updateUserAddress(addressId, addressData);
      if (response.success) {
        return response.updatedUser;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("Something went wrong in delete-user-address thunk", error);
      throw new Error(error);
    }
  }
);

export const fetchUserOrdersAsync = createAsyncThunk(
  "order/fetchUserOrders",
  async () => {
    try {
      const response = await fetchUserOrders();
      if (response.success) {
        console.log(response.orders);
        return response.orders;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("Something Went Wrong in place-order-thunk", error);
      throw new Error(error.message);
    }
  }
);

export const placeOrderAsync = createAsyncThunk(
  "order/placeOrder",
  async ({
    products,
    totalItems,
    totalAmount,
    selectedUserAddress,
    selectedPaymentMethod,
  }) => {
    try {
      const response = await placeOrder(
        products,
        totalItems,
        totalAmount,
        selectedUserAddress,
        selectedPaymentMethod
      );
      return response.orders;
    } catch (error) {
      console.error("Something Went Wrong in place-order-thunk", error);
    }
  }
);

export const cancelOrderAsync = createAsyncThunk(
  "order/cancelOrder",
  async (orderId) => {
    try {
      const response = await cancelOrder(orderId);
      if (response.success) {
        return response.orders;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("Something went wrong while cancelling order", error);
      throw new Error(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setSelectedUserAddress: (state, action) => {
      state.selectedUserAddress = action.payload;
    },
    mySetSelectedUserAddress: (state, action) => {
      state.selectedUserAddress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })

      .addCase(addUserAddressAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUserAddressAsync.rejected, (state, action) => {
        console.log("rejected");
        state.loading = false;
        state.error = action.error ? action.error.message : "Error in response";
      })
      .addCase(addUserAddressAsync.fulfilled, (state, action) => {
        console.log("fulfilled");
        state.loading = false;
        state.userInfo.addresses = action.payload;
      })

      .addCase(deleteUserAddressAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUserAddressAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUserAddressAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })

      .addCase(updateUserAddressAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserAddressAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUserAddressAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })

      .addCase(placeOrderAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(placeOrderAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(placeOrderAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.currentOrder =
          action?.payload?.orders[action.payload.orders.length - 1];
      })

      .addCase(fetchUserOrdersAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserOrdersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "error";
      })
      .addCase(fetchUserOrdersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })

      .addCase(cancelOrderAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelOrderAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "error";
      })
      .addCase(cancelOrderAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
  },
});

export const { setSelectedUserAddress, mySetSelectedUserAddress } =
  userSlice.actions;
export default userSlice.reducer;
