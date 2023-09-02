import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteUserAddress, fetchAllOrders, getUser, placeOrder } from "./userAPI";
import { addUserAddress } from "../checkout/checkoutAPI";

const initialState = {
  loading: false,
  userInfo:null,
  selectedUserAddress:null,
  orders: [],
  currentOrder: null,
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
  async ({ addressData, userId, token }) => {
    try {
      const response = await addUserAddress(addressData, userId, token);
      return response?.user?.addresses;
    } catch (error) {
      console.error("Something Went Wrong Add-Address-User Thunk", error);
    }
  }
);

export const deleteUserAddressAsync = createAsyncThunk(
  "auth/deleteUserAddress",
  async ({ userId, addressId }) => {
    console.log(userId, addressId);
    try {
      const response = await deleteUserAddress(userId, addressId);
      console.log(response);
      return response;
    } catch (error) {
      console.error(
        "Something went wrong in delete-user-address thunk",
        error
      );
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

const userSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setSelectedUserAddress: (state, action)=>{
      state.selectedUserAddress= action.payload
    }
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
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addUserAddressAsync.fulfilled, (state, action) => {
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
        state.orders = action.payload;
      });
  },
});

export const {setSelectedUserAddress} = userSlice.actions
export default userSlice.reducer;
