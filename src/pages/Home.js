import React from "react";
import Layout from "../features/layout/Layout";
import CategoryListing from "../features/category-preview/CategoryListing";
import Promo from "../features/products/product-promo/Promo";
import ProductListing from "../features/products/product-listing/ProductListing";

const Home = () => {
  
  return (
    <Layout pageTitle={"WristWorthy - Home"}>
      <Promo />
      <CategoryListing />
      <ProductListing />
    </Layout>
  );
};

export default Home;
