import { configureStore } from "@reduxjs/toolkit";
import productListingReducer from "../features/products/product-listing/productListingSlice";
import authReducer from '../features/auth/authSlice'
import cartReducer from '../features/cart/cartSlice'
import orderReducer from '../features/order/orderSlice'

export const store = configureStore({
  reducer: {
    product: productListingReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer
  },
});
