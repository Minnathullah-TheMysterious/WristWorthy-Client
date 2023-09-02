import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuthData, login } from "./authAPI";

const initialState = {
  loading: false,
  user: null,
  error: null,
};

export const loginAsync = createAsyncThunk("auth/login", async (loginData) => {
  try {
    const response = await login(loginData);

    if (response?.success) {
      return response?.userWithOutAddressesArray;
    } else {
      throw new Error(response?.message);
    }
  } catch (error) {
    console.error("Something Went Wrong in login thunk", error);
    throw new Error("Something Went Wrong in login thunk");
  }
});

export const getAuthDataAsync = createAsyncThunk(
  "auth/getAuthData",
  async (uId) => {
    try {
      const response = await getAuthData(uId);
      return response;
    } catch (error) {
      console.error("Something Went Wrong in get-auth-data thunk", error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error ? action.error.message : "An error occurred";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getAuthDataAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAuthDataAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error ? action.error.message : "An error occurred";
      })
      .addCase(getAuthDataAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      });
  },
});

export default authSlice.reducer;
