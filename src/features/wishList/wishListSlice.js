import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToWishList,
  deleteWishListItem,
  fetchWishList,
} from "./wishListAPI";

const initialState = {
  loading: false,
  list: [],
  error: null,
};

export const addToWishListAsync = createAsyncThunk(
  "wishList/addToWishList",
  async (product) => {
    console.log(product);
    try {
      const response = await addToWishList(product);
      return response;
    } catch (error) {
      console.error("Something Went Wrong in add-to-wishList thunk", error);
    }
  }
);

export const fetchWishListAsync = createAsyncThunk(
  "wishList/fetchWishList",
  async (userId) => {
    try {
      const response = await fetchWishList(userId);
      return response;
    } catch (error) {
      console.error("Something Went Wrong in fetch-wishList thunk", error);
    }
  }
);

export const deleteWishListItemAsync = createAsyncThunk(
  "wishList/deleteWishListItem",
  async (wishListId) => {
    try {
      const response = await deleteWishListItem(wishListId);
      return response;
    } catch (error) {
      console.error("Something Went Wrong in fetch-wishList thunk", error);
    }
  }
);

const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToWishListAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToWishListAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error ? action.error.message : "Error";
      })
      .addCase(addToWishListAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })

      .addCase(fetchWishListAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishListAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error ? action.error.message : "Error";
      })
      .addCase(fetchWishListAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })

      .addCase(deleteWishListItemAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteWishListItemAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error ? action.error.message : "Error";
      })
      .addCase(deleteWishListItemAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state?.list?.filter((item) => item?.id !== action.payload);
      });
  },
});

export default wishListSlice.reducer;
