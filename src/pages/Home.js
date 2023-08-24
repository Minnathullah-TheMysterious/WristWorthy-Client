import React, {useEffect} from "react";
import Layout from "../features/layout/Layout";
import CategoryListing from "../features/category-preview/CategoryListing";
import Promo from "../features/products/product-promo/Promo";
import ProductListing from "../features/products/product-listing/ProductListing";
import { authDetailsAsync } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    const userFromLocalStorage = JSON.parse(localStorage.getItem('user'))
    if(userFromLocalStorage){
      dispatch(authDetailsAsync())
    }
  },[dispatch])
  return (
    <Layout pageTitle={"WristWorthy - Home"}>
      <Promo />
      <CategoryListing />
      <ProductListing />
    </Layout>
  );
};

export default Home;
