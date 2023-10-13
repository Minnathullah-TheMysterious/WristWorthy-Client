import React, { useEffect, useState } from "react";
import Checkout from "../features/checkout/Checkout";
import { useSelector } from "react-redux";
import LoadingBar from "react-top-loading-bar";

const CheckoutPage = () => {
  const userLoading = useSelector((state) => state?.user?.loading);
  const cartLoading = useSelector((state) => state?.cart?.loading);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (userLoading || cartLoading) {
      setProgress(progress + 50);
    } else {
      setProgress(0);
    }
  }, [progress, userLoading, cartLoading]);

  return (
    <>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Checkout />
    </>
  );
};

export default CheckoutPage;
