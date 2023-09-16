import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import authReducer from '../features/auth/authSlice'
import cartReducer from '../features/cart/cartSlice'
import userReducer from '../features/user/userSlice'
import wishlistReducer from '../features/wishlist/wishlistSlice'

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
    user: userReducer
  },
});
