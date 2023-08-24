import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PassResetPage from "./pages/PassResetPage";
import OtpVerifyPage from "./pages/OtpVerifyPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import PageNotFound from "./pages/PageNotFound";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./features/auth/auth-components/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route path="cart" element={<CartPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/req-password-reset" element={<PassResetPage />} />
        <Route path="/verify-otp-change-password" element={<OtpVerifyPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/product-details/:id" element={<ProductDetailsPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
