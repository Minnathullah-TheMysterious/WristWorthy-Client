import React from "react";
import Layout from "../features/layout/Layout";
import CategoryListing from "../features/categories/CategoryListing";
import Promo from "../features/products/components/Promo";
import ProductListing from "../features/products/components/ProductListing";
import { useSelector } from "react-redux";
import AdminProductListing from "../features/admin/components/AdminProductListing";
import AdminCategoryListing from "../features/admin/components/AdminCategoryListing";

const Home = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Layout pageTitle={"WristWorthy - Home"}>
      {user?.role === "user" || !user ? (
        <>
          <Promo />
          <CategoryListing />
          <ProductListing />
        </>
      ) : (
        <>
          <AdminCategoryListing />
          <AdminProductListing />
        </>
      )}
    </Layout>
  );
};

export default Home;
