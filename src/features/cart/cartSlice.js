import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addItemToCart,
  fetchUserCart,
  updateCartItemQuantity,
} from "./cartAPI";

const initialState = {
  loading: false,
  items: [],
  error: null,
};

export const addItemToCartAsync = createAsyncThunk(
  "cart/addItemToCart",
  async (cartItem) => {
    const response = await addItemToCart(cartItem);
    console.log(response)
    return response
  }
);

export const fetchUserCartAsync = createAsyncThunk(
  "cart/fetchUserCart",
  async (uId) => {
    const response = await fetchUserCart(uId);
    return response.data;
  }
);

export const updateCartItemQuantityAsync = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async (update) => {
    const response = await updateCartItemQuantity(update);
    return response.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addItemToCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItemToCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addItemToCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(fetchUserCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(updateCartItemQuantityAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCartItemQuantityAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateCartItemQuantityAsync.fulfilled, (state, action) => {
        state.loading = false;
        const updateItemIndex = state.items.findIndex(
          (item) => item.id === action?.payload?.id
        );
        state.items[updateItemIndex] = action.payload;
      });
  },
});

export default cartSlice.reducer;
