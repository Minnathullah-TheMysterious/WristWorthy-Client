import React from "react";
import Layout from "../features/layout/Layout";
// import CategoryListing from "../features/categories/CategoryListing";
import Promo from "../features/products/components/Promo";
import ProductListing from "../features/products/components/ProductListing";
import { useSelector } from "react-redux";
import AdminProductListing from "../features/admin/components/AdminProductListing";
import AdminCategoryListing from "../features/admin/components/AdminCategoryListing";
import AdminBrandListing from "../features/admin/components/AdminBrandListing";

const Home = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Layout pageTitle={"WristWorthy - Home"}>
      {user?.role === "user" || !user ? (
        <>
          <Promo />
          {/* <CategoryListing /> */}
          <ProductListing />
        </>
      ) : (
        <div>
          <AdminCategoryListing
            wrapClass={
              "whitespace-nowrap overflow-x-auto my-6 lg:gap-x-6 sm:gap-x-3  gap-x-2 md:gap-x-4 flex flex-row"
            }
          />
          <AdminBrandListing
            wrapClass={
              "whitespace-nowrap overflow-x-auto my-6 lg:gap-x-6 sm:gap-x-3  gap-x-2 md:gap-x-4 flex flex-row"
            }
          />
          <AdminProductListing />
        </div>
      )}
    </Layout>
  );
};

export default Home;
