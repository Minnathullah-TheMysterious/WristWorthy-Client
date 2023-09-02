import React from "react";
import Layout from "../features/layout/Layout";
import CategoryListing from "../features/categories/CategoryListing";
import Promo from "../features/products/components/Promo";
import ProductListing from "../features/products/components/ProductListing";

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
