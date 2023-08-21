import { configureStore } from "@reduxjs/toolkit";
import productListingReducer from "../features/products/product-listing/productListingSlice";

//demo
import userReducer from "../features/userDemo/usersSliceDemo";

export const store = configureStore({
  reducer: {
    product: productListingReducer,

    //demo 
    user: userReducer,
  },
});
