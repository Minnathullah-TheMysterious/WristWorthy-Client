import React, { useEffect } from "react";
import Cart from "../features/cart/Cart";
import Layout from "../features/layout/Layout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { deleteUserCartItemAsync } from "../features/cart/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state?.cart?.items);

  console.log(cartItems);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleCheckoutClick = (e) => {
    e.preventDefault();
    if (!cartItems?.items?.length) {
      return toast("Your Cart Is Empty, Please Add Item To Checkout", {
        className: "font-serif bg-blue-900 text-white",
      });
    }
    cartItems?.items?.forEach((item) => {
      if (item?.product?.stock < 1) {
        dispatch(deleteUserCartItemAsync(item?.product?._id));
      }
    });
    navigate("/dashboard/user/checkout");
  };
  return (
    <Layout pageTitle={"WristWorthy - Cart"}>
      <Cart btnText={"Checkout"} destination={(e) => handleCheckoutClick(e)} />
    </Layout>
  );
};

export default CartPage;
