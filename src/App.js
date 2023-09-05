import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUserCartAsync } from "./features/cart/cartSlice";
import { Toaster } from "react-hot-toast";
import { getUserAsync } from './features/user/userSlice';
import { getAuthDataAsync } from "./features/auth/authSlice";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PassResetPage from "./pages/PassResetPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoute from "./routes/ProtectedRoute";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfilePage from "./pages/UserProfilePage";
import UserAddressesPage from "./pages/UserAddressesPage";
import WishListPage from "./pages/WishListPage";

function App() {
  const dispatch = useDispatch();

  const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
  const userId = userFromLocalStorage?.user_id;

  useEffect(() => {
    userId && dispatch(fetchUserCartAsync(userId));
    userId && dispatch(getUserAsync(userId));
    userId && dispatch(getAuthDataAsync(userId))
  }, [dispatch, userId]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/" element={<ProtectedRoute />}>
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="order-success" element={<OrderSuccessPage />} />
          <Route path="user-orders" element={<UserOrdersPage />} />
          <Route path="user-profile" element={<UserProfilePage />} />
          <Route path="user-addresses" element={<UserAddressesPage />} />
          <Route path="user-wishList" element={<WishListPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/req-password-reset" element={<PassResetPage />} />
        <Route path="/product-details/:id" element={<ProductDetailsPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
