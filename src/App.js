import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCartItemsAsync } from "./features/cart/cartSlice";
import { Toaster } from "react-hot-toast";
import { getUserAsync } from "./features/user/userSlice";
import { getAuthDataAsync } from "./features/auth/authSlice";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PassResetPage from "./pages/PassResetPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import PageNotFound from "./pages/PageNotFound";
import UserProtectedRoute from "./routes/UserProtectedRoute";
import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfilePage from "./pages/UserProfilePage";
import UserAddressesPage from "./pages/UserAddressesPage";
import WishlistPage from "./pages/WishlistPage";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";
import AdminProductDetailsPage from "./pages/adminPages/AdminProductDetailsPage";
import CreateProductPage from "./pages/adminPages/CreateProductPage";
import AdminProductsPage from "./pages/adminPages/AdminProductsPage";
import AdminCategoriesPage from "./pages/adminPages/AdminCategoriesPage";
import AdminBrandsPage from "./pages/adminPages/AdminBrandsPage";
import UpdateProductPage from "./pages/adminPages/UpdateProductPage";
import AdminOrdersPage from "./pages/adminPages/AdminOrdersPage";
import StripeCheckoutPage from "./pages/StripeCheckoutPage";
import CardPaymentOrderSuccessPage from './pages/CardPaymentOrderSuccessPage';
import CashPaymentOrderSuccessPage from './pages/CashPaymentOrderSuccessPage';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.user);

  console.log(user);
  console.log(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

  useEffect(() => {
    dispatch(getAuthDataAsync());
  }, [dispatch]);

  useEffect(() => {
    user && user?.role === "user" && dispatch(fetchUserCartItemsAsync());
    user && dispatch(getUserAsync());
  }, [dispatch, user]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/req-password-reset" element={<PassResetPage />} />
        <Route
          path="/product-details/:productId"
          element={<ProductDetailsPage />}
        />
        {/* LoggedIn User Routes */}
        <Route path="/dashboard/user" element={<UserProtectedRoute />}>
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="card-payment-order-success/:orderId" element={<CardPaymentOrderSuccessPage />} />
          <Route path="cash-payment-order-success" element={<CashPaymentOrderSuccessPage />} />
          <Route path="orders" element={<UserOrdersPage />} />
          <Route path="profile" element={<UserProfilePage />} />
          <Route path="addresses" element={<UserAddressesPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="stripe-checkout" element={<StripeCheckoutPage />} />
        </Route>
        {/* Admin Routes */}
        <Route path="/dashboard/admin" element={<AdminProtectedRoute />}>
          <Route
            path="product-details/:productId"
            element={<AdminProductDetailsPage />}
          />
          <Route path="create-product" element={<CreateProductPage />} />
          <Route
            path="update-product/:productId"
            element={<UpdateProductPage />}
          />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="categories" element={<AdminCategoriesPage />} />
          <Route path="brands" element={<AdminBrandsPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
