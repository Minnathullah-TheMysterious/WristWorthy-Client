import React from "react";
import Cart from "../features/cart/Cart";
import Layout from "../features/layout/Layout";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const handleCheckoutClick = (e) => {
    e.preventDefault();
    navigate("/dashboard/checkout");
  };
  return (
    <Layout pageTitle={"WristWorthy - Cart"}>
      <Cart btnText={"Checkout"} destination={(e) => handleCheckoutClick(e)} />
    </Layout>
  );
};

export default CartPage;
