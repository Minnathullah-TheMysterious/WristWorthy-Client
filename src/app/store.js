import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import userReducer from "../features/user/userSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import adminReducer from "../features/admin/adminSlice";
import promoReducer from "../features/promo/promoSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
    user: userReducer,
    admin: adminReducer,
    promo: promoReducer,
  },
});
