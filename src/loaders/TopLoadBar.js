import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingBar from "react-top-loading-bar";

// TODO: manage addresses top loading bar not working
// TODO: my profile top loading bar not working

const TopLoadBar = () => {
  const productLoading = useSelector((state) => state?.product?.loading);
  const userLoading = useSelector((state) => state?.user?.loading);
  const wishlistLoading = useSelector((state) => state?.wishlist?.loading);
  const cartLoading = useSelector((state) => state?.cart?.loading);
  const authLoading = useSelector((state) => state?.auth?.loading);
  const adminLoading = useSelector((state) => state?.admin?.loading);
  const promoLoading = useSelector((state) => state?.promo?.loading);

  const [progress, setProgress] = useState(0);

  console.log("product loading", productLoading);
  console.log("user loading", userLoading);
  console.log("wishlist loading", wishlistLoading);
  console.log("cart loading", cartLoading);
  console.log("auth loading", authLoading);
  console.log("admin loading", adminLoading);
  console.log("promo loading", promoLoading);
  console.log("progress", progress);

  useEffect(() => {
    if (
      productLoading ||
      userLoading ||
      wishlistLoading ||
      cartLoading ||
      authLoading ||
      adminLoading ||
      promoLoading
    ) {
      setProgress(progress + 50);
    } else {
      setProgress(0);
    }
  }, [
    productLoading,
    progress,
    userLoading,
    wishlistLoading,
    cartLoading,
    authLoading,
    adminLoading,
    promoLoading,
  ]);

  return (
    <LoadingBar
      color="#f11946"
      progress={progress}
      onLoaderFinished={() => setProgress(0)}
    />
  );
};

export default TopLoadBar;
