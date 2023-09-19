import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addMyItemToCart,
  deleteMyUserCartItem,
  fetchUserCartItems,
  resetMyCart,
  updateMyCartItemQuantity,
} from "./cartAPI";

const initialState = {
  loading: false,
  items: [],
  myItems: [],
  error: null,
};

//backend
export const addMyItemToCartAsync = createAsyncThunk(
  "cart/addMyItemToCart",
  async ({ userId, productId }) => {
    try {
      const response = await addMyItemToCart(userId, productId);
      return response?.cart;
    } catch (error) {
      console.error("Something Went Wrong in Add-to-Cart thunk", error);
    }
  }
);

//backend
export const fetchUserCartItemsAsync = createAsyncThunk(
  "cart/fetchUserCartItems",
  async (userId) => {
    try {
      const response = await fetchUserCartItems(userId);
      return response?.cart;
    } catch (error) {
      console.error("Something Went Wrong in fetch-Cart thunk", error);
    }
  }
);

//backend
export const updateMyCartItemQuantityAsync = createAsyncThunk(
  "cart/updateMyCartItemQuantity",
  async ({ userId, productId, quantity }) => {
    try {
      const response = await updateMyCartItemQuantity(
        userId,
        productId,
        quantity
      );
      return response.cart;
    } catch (error) {
      console.error("Something Went Wrong in fetch-Cart thunk", error);
    }
  }
);

//backend
export const deleteMyUserCartItemAsync = createAsyncThunk(
  "cart/deleteMyUserCartItem",
  async ({ userId, productId }) => {
    console.log(userId, productId);
    try {
      const response = await deleteMyUserCartItem(userId, productId);
      return response?.cart;
    } catch (error) {
      console.error("Something Went Wrong in fetch-Cart thunk", error);
    }
  }
);

//backend
export const resetMyCartAsync = createAsyncThunk(
  "cart/resetMyCart",
  async (userId) => {
    try {
      const response = await resetMyCart(userId);
      if (response) {
        return [];
      }
    } catch (error) {
      console.error("Something Went Wrong in fetch-Cart thunk", error);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addMyItemToCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addMyItemToCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addMyItemToCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.myItems = action.payload;
      })

      .addCase(fetchUserCartItemsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserCartItemsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserCartItemsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.myItems = action.payload;
      })

      .addCase(deleteMyUserCartItemAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteMyUserCartItemAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteMyUserCartItemAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.myItems = action.payload;
      })

      .addCase(resetMyCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetMyCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(resetMyCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.myItems = action.payload;
      })

      .addCase(updateMyCartItemQuantityAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMyCartItemQuantityAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateMyCartItemQuantityAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.myItems = action.payload;
      });
  },
});

export default cartSlice.reducer;
