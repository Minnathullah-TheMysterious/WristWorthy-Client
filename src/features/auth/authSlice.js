import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addUserAddress } from "../checkout/checkoutAPI";
import { getUser, login } from "./authAPI";
import { deleteUserAddress } from "../user-addresses/userAddressesAPI";

const initialState = {
  loading: false,
  user: null,
  selectedUserAddress: null,
  error: null,
};

export const addUserAddressAsync = createAsyncThunk(
  "auth/addUserAddress",
  async ({ addressData, userId, token }) => {
    try {
      const response = await addUserAddress(addressData, userId, token);
      return response?.user?.addresses;
    } catch (error) {
      console.error('Something Went Wrong Add-Address-User Thunk', error)
    }
   
  }
);

export const loginAsync = createAsyncThunk("auth/login", async (loginData) => {
  try {
    const response = await login(loginData);
    console.log(response);
    return response.user;
  } catch (error) {
    console.error("Something Went Wrong in login thunk", error);
  }
});

export const getUserAsync = createAsyncThunk("auth/getUser", async (userId) => {
  try {
    const response = await getUser(userId);
    return response;
  } catch (error) {
    console.error("Something went wrong in get-user thunk", error);
  }
});

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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSelectedUserAddress: (state, action)=>{
      state.selectedUserAddress= action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUserAddressAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUserAddressAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user.addresses = action.payload;
      })
      .addCase(addUserAddressAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUserAddressAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUserAddressAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(deleteUserAddressAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {setSelectedUserAddress} = authSlice.actions
export default authSlice.reducer;
