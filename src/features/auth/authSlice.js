import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuthData, login, requestPasswordResetMail, resetPasswordMail } from "./authAPI";

const initialState = {
  loading: false,
  user: null,
  mailSent: false,
  error: null,
};

export const loginAsync = createAsyncThunk("auth/login", async (loginData) => {
  try {
    const response = await login(loginData);

    if (response?.success) {
      return response?.user;
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
  async () => {
    try {
      const response = await getAuthData();
      return response;
    } catch (error) {
      console.error("Something Went Wrong in get-auth-data thunk", error);
    }
  }
);

export const requestPasswordResetMailAsync = createAsyncThunk(
  "auth/requestPasswordResetMail",
  async ({email, resetPasswordLink}) => {
    console.log(resetPasswordLink)
    try {
      const response = await requestPasswordResetMail(email, resetPasswordLink);

      if (response?.success) {
        return response?.success;
      } else {
        throw new Error(response?.message);
      }
    } catch (error) {
      console.error("Something Went Wrong in login thunk", error);
      throw new Error(error.message || "Something Went Wrong in login thunk");
    }
  }
);

export const resetPasswordMailAsync = createAsyncThunk(
  "auth/resetPasswordMail",
  async ({email, newPassword, confirmNewPassword}) => {
    console.log(email)
    try {
      const response = await resetPasswordMail(email, newPassword, confirmNewPassword);

      if (response?.success) {
        return response?.success;
      } else {
        throw new Error(response?.message);
      }
    } catch (error) {
      console.error("Something Went Wrong in login thunk", error);
      throw new Error(error.message || "Something Went Wrong in login thunk");
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
      })

      .addCase(requestPasswordResetMailAsync.pending, (state) => {
        state.loading = true;
        state.mailSent = false
      })
      .addCase(requestPasswordResetMailAsync.rejected, (state, action) => {
        state.loading = false;
        state.mailSent = false
        state.error = action.error ? action.error.message : "An error occurred";
      })
      .addCase(requestPasswordResetMailAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.mailSent = action.payload
      })

      .addCase(resetPasswordMailAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPasswordMailAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error ? action.error.message : "An error occurred";
      })
      .addCase(resetPasswordMailAsync.fulfilled, (state) => {
        state.loading = false;
      })
  },
});

export default authSlice.reducer;
