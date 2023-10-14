import React, { useEffect } from "react";
import Checkout from "../features/checkout/Checkout";
import { useSelector } from "react-redux";
import LoadingBar from "react-top-loading-bar";

const CheckoutPage = () => {
  const userLoading = useSelector((state) => state?.user?.loading);
  const cartLoading = useSelector((state) => state?.cart?.loading);

  const progress = cartLoading || userLoading ? 100 : 0;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => {}}
      />
      <Checkout />
    </>
  );
};

export default CheckoutPage;
