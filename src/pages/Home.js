import React, { useEffect } from "react";
import Layout from "../features/layout/Layout";
import Promo from "../features/promo/Promo";
import ProductListing from "../features/products/components/ProductListing";
import { useDispatch, useSelector } from "react-redux";
import AdminProductListing from "../features/admin/components/AdminProductListing";
import AdminCategoryListing from "../features/admin/components/AdminCategoryListing";
import AdminBrandListing from "../features/admin/components/AdminBrandListing";
import AdminPromo from "../features/admin/components/AdminPromo";
import {
  fetchBrandsAsync,
  fetchCategoriesAsync,
} from "../features/products/productSlice";

const Home = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.auth?.user);

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
    dispatch(fetchBrandsAsync());
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [dispatch]);

  return (
    <Layout pageTitle={"WristWorthy - Home"}>
      {user?.role === "user" || user?.success === false ? (
        <>
          <Promo />
          <ProductListing />
        </>
      ) : (
        <div>
          <AdminPromo />
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
