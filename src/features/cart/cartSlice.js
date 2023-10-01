import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addItemToCart,
  deleteUserCartItem,
  fetchUserCartItems,
  resetCart,
  updateCartItemQuantity,
} from "./cartAPI";

const initialState = {
  loading: false,
  items: [],
  error: null,
};

//backend
export const addItemToCartAsync = createAsyncThunk(
  "cart/addItemToCart",
  async (productId) => {
    try {
      const response = await addItemToCart(productId);
      return response?.cart;
    } catch (error) {
      console.error("Something Went Wrong in Add-to-Cart thunk", error);
    }
  }
);

//backend
export const fetchUserCartItemsAsync = createAsyncThunk(
  "cart/fetchUserCartItems",
  async () => {
    try {
      const response = await fetchUserCartItems();
      return response?.cart;
    } catch (error) {
      console.error("Something Went Wrong in fetch-Cart thunk", error);
    }
  }
);

//backend
export const updateCartItemQuantityAsync = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ productId, quantity }) => {
    try {
      const response = await updateCartItemQuantity(
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
export const deleteUserCartItemAsync = createAsyncThunk(
  "cart/deleteUserCartItem",
  async (productId) => {
    console.log(productId);
    try {
      const response = await deleteUserCartItem(productId);
      return response?.cart;
    } catch (error) {
      console.error("Something Went Wrong in fetch-Cart thunk", error);
    }
  }
);

//backend
export const resetCartAsync = createAsyncThunk(
  "cart/resetCart",
  async () => {
    try {
      const response = await resetCart();
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
      .addCase(addItemToCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItemToCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addItemToCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
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
        state.items = action.payload;
      })

      .addCase(deleteUserCartItemAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUserCartItemAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUserCartItemAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })

      .addCase(resetCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
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
        state.items = action.payload;
      });
  },
});

export default cartSlice.reducer;
