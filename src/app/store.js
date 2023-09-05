import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import authReducer from '../features/auth/authSlice'
import cartReducer from '../features/cart/cartSlice'
import userReducer from '../features/user/userSlice'
import wishListReducer from '../features/wishList/wishListSlice'

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    wishList: wishListReducer,
    auth: authReducer,
    user: userReducer
  },
});
