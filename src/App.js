import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
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
import OrderSuccessPage from "./pages/OrderSuccessPage";
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

function App() {
  const dispatch = useDispatch();

  const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
  const userId = userFromLocalStorage?._id;

  useEffect(() => {
    userId && dispatch(fetchUserCartItemsAsync(userId));
    userId && dispatch(getUserAsync(userId));
    userId && dispatch(getAuthDataAsync(userId));
  }, [dispatch, userId]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/req-password-reset" element={<PassResetPage />} />
        <Route path="/product-details/:productId" element={<ProductDetailsPage />} />
        {/* LoggedIn User Routes */}
        <Route path="/dashboard/user" element={<UserProtectedRoute />}>
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="order-success" element={<OrderSuccessPage />} />
          <Route path="orders" element={<UserOrdersPage />} />
          <Route path="profile" element={<UserProfilePage />} />
          <Route path="addresses" element={<UserAddressesPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
        </Route>
        {/* Admin Routes */}
        <Route path="/dashboard/admin" element={<AdminProtectedRoute />}>
          <Route path="product-details/:productId" element={<AdminProductDetailsPage />}/>
          <Route path="create-product" element={<CreateProductPage />} />
          <Route path="update-product/:productId" element={<UpdateProductPage />} />
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
