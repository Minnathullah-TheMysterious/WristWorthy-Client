import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToWishlist,
  deleteWishlistItem,
  fetchWishlist,
} from "./wishlistAPI";

const initialState = {
  loading: false,
  list: [],
  error: null,
};

export const addToWishlistAsync = createAsyncThunk(
  "wishlist/addToWishlist",
  async ({ userId, productId }) => {
    try {
      const response = await addToWishlist(userId, productId);
      if (response.success) {
        return response.wishlist;
      }
    } catch (error) {
      console.error("Something Went Wrong in add-to-wishlist thunk", error);
    }
  }
);

export const fetchWishlistAsync = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (userId) => {
    try {
      const response = await fetchWishlist(userId);
      return response;
    } catch (error) {
      console.error("Something Went Wrong in fetch-wishlist thunk", error);
    }
  }
);

export const deleteWishlistItemAsync = createAsyncThunk(
  "wishlist/deleteWishlistItem",
  async ({ userId, productId }) => {
    try {
      const response = await deleteWishlistItem(userId, productId);
      return response;
    } catch (error) {
      console.error("Something Went Wrong in fetch-wishlist thunk", error);
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToWishlistAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToWishlistAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error ? action.error.message : "Error";
      })
      .addCase(addToWishlistAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })

      .addCase(fetchWishlistAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlistAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error ? action.error.message : "Error";
      })
      .addCase(fetchWishlistAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })

      .addCase(deleteWishlistItemAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteWishlistItemAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error ? action.error.message : "Error";
      })
      .addCase(deleteWishlistItemAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      });
  },
});

export default wishlistSlice.reducer;
