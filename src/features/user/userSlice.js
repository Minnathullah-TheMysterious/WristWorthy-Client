import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteUserAddress,
  fetchAllOrders,
  getUser,
  placeOrder,
  addUserAddress,
  updateUserAddress,
  myPlaceOrder,
  fetchAllUserOrders,
} from "./userAPI";

const initialState = {
  loading: false,
  userInfo: null,
  selectedUserAddress: null,
  mySelectedUserAddress: null,
  orders: [],
  myOrders: [],
  currentOrder: null,
  myCurrentOrder: null,
  error: null,
};
//we may need more info of current order

export const getUserAsync = createAsyncThunk("auth/getUser", async (userId) => {
  try {
    const response = await getUser(userId);
    return response;
  } catch (error) {
    console.error("Something went wrong in get-user thunk", error);
  }
});

export const addUserAddressAsync = createAsyncThunk(
  "auth/addUserAddress",
  async ({ addressData, userId }) => {
    try {
      const response = await addUserAddress(addressData, userId);
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
  async ({ userId, addressId }) => {
    try {
      const response = await deleteUserAddress(userId, addressId);
      return response;
    } catch (error) {
      console.error("Something went wrong in delete-user-address thunk", error);
    }
  }
);

export const updateUserAddressAsync = createAsyncThunk(
  "auth/updateUserAddress",
  async ({ userId, addressId, addressData }) => {
    console.log(
      `user_id: ${userId} \naddress_id: ${addressId} \naddress_data: ${addressData}`
    );
    try {
      const response = await updateUserAddress(userId, addressId, addressData);
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

//backend
export const fetchAllUserOrdersAsync = createAsyncThunk(
  "order/fetchAllUserOrders",
  async (userId) => {
    try {
      const response = await fetchAllUserOrders(userId);
      if (response.success) {
        console.log(response.orders)
        return response.orders;
      }
      else{
        throw new Error(response.message)
      }
    } catch (error) {
      console.error("Something Went Wrong in place-order-thunk", error);
      throw new Error(error.message)
    }
  }
);

export const placeOrderAsync = createAsyncThunk(
  "order/placeOrder",
  async ({ userId, order }) => {
    try {
      const response = await placeOrder(userId, order);
      console.log(response);
      return response;
    } catch (error) {
      console.error("Something Went Wrong in place-order-thunk", error);
    }
  }
);

//backend
export const myPlaceOrderAsync = createAsyncThunk(
  "order/myPlaceOrder",
  async ({
    userId,
    products,
    totalItems,
    totalAmount,
    selectedUserAddress,
    selectedPaymentMethod,
  }) => {
    try {
      const response = await myPlaceOrder(
        userId,
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

const userSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setSelectedUserAddress: (state, action) => {
      state.selectedUserAddress = action.payload;
    },
    mySetSelectedUserAddress: (state, action) => {
      state.mySelectedUserAddress = action.payload;
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

      .addCase(myPlaceOrderAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(myPlaceOrderAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(myPlaceOrderAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.myOrders = action.payload;
        state.myCurrentOrder =
          action?.payload?.orders[action.payload.orders.length - 1];
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
        state?.orders?.push(action.payload);
        state.currentOrder = action.payload;
      })

      .addCase(fetchAllUserOrdersAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUserOrdersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'error';
      })
      .addCase(fetchAllUserOrdersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.myOrders = action.payload;
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
        state.orders = action.payload;
      });
  },
});

export const { setSelectedUserAddress, mySetSelectedUserAddress } =
  userSlice.actions;
export default userSlice.reducer;
