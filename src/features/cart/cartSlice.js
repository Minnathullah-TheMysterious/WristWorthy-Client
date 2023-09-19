import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addItemToCart,
  addMyItemToCart,
  deleteMyUserCartItem,
  deleteUserCartItem,
  fetchUserCart,
  fetchUserCartItems,
  resetCart,
  resetMyCart,
  updateCartItemQuantity,
  updateMyCartItemQuantity,
} from "./cartAPI";

const initialState = {
  loading: false,
  items: [],
  myItems: [],
  error: null,
};

export const addItemToCartAsync = createAsyncThunk(
  "cart/addItemToCart",
  async (cartItem) => {
    try {
      const response = await addItemToCart(cartItem);
      console.log(response);
      return response;
    } catch (error) {
      console.error("Something Went Wrong in Add-to-Cart thunk", error);
    }
  }
);

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

export const fetchUserCartAsync = createAsyncThunk(
  "cart/fetchUserCart",
  async (uId) => {
    try {
      const response = await fetchUserCart(uId);
      return response;
    } catch (error) {
      console.error("Something Went Wrong in fetch-Cart thunk", error);
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

export const updateCartItemQuantityAsync = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async (update) => {
    try {
      const response = await updateCartItemQuantity(update);
      return response.data;
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

export const deleteUserCartItemAsync = createAsyncThunk(
  "cart/deleteUserCartItem",
  async (cartId) => {
    try {
      const response = await deleteUserCartItem(cartId);
      return response;
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

export const resetCartAsync = createAsyncThunk(
  "cart/resetCart",
  async (uId) => {
    try {
      const response = await resetCart(uId);
      return response;
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

      .addCase(deleteUserCartItemAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUserCartItemAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUserCartItemAsync.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.items = state?.items?.filter(
          (item) => item?.id !== action.payload
        );
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

      .addCase(resetCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(resetCartAsync.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
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
