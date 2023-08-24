import { configureStore } from "@reduxjs/toolkit";
import productListingReducer from "../features/products/product-listing/productListingSlice";
import productDetailsReducer from '../features/products/product-details/productDetailsSlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    product: productListingReducer,
    productDetails: productDetailsReducer, 
    auth: authReducer
  },
});
