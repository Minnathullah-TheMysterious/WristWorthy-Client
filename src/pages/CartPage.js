import React from "react";
import Cart from "../features/cart/Cart";
import Layout from "../features/layout/Layout";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const CartPage = () => {
  const cartItems = useSelector((state) => state?.cart?.myItems);
  const navigate = useNavigate();
  
  const handleCheckoutClick = (e) => {
    e.preventDefault();
    if (!cartItems?.items?.length) {
      return toast("Your Cart Is Empty, Please Add Item To Checkout", {
        className: "font-serif bg-blue-900 text-white",
      });
    }
    navigate("/dashboard/user/checkout");
  };
  return (
    <Layout pageTitle={"WristWorthy - Cart"}>
      <Cart btnText={"Checkout"} destination={(e) => handleCheckoutClick(e)} />
    </Layout>
  );
};

export default CartPage;
