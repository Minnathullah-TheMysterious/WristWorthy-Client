import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addUserAddress } from "../checkout/checkoutAPI";
import { getUser, login } from "./authAPI";

const initialState = {
  loading: false,
  user: null,
  error: null,
};

export const addUserAddressAsync = createAsyncThunk(
  "auth/addUserAddress",
  async ({ addressData, userId, token }) => {
    const response = await addUserAddress(addressData, userId, token);
    return response?.user?.addresses;
  }
);

export const loginAsync = createAsyncThunk("auth/login", async (loginData) => {
  const response = await login(loginData);
  console.log(response);
  return response.user;
});

export const getUserAsync = createAsyncThunk("auth/getUser", async (userId) => {
  const response = await getUser(userId);
  return response;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUserAddressAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUserAddressAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user.addresses = action.payload
      })
      .addCase(addUserAddressAsync.rejected, (state, action) => {
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

export default authSlice.reducer;
