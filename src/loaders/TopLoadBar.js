import React from "react";
import { useSelector } from "react-redux";
import LoadingBar from "react-top-loading-bar";

const TopLoadBar = () => {
  const productLoading = useSelector((state) => state?.product?.loading);
  const userLoading = useSelector((state) => state?.user?.loading);
  const wishlistLoading = useSelector((state) => state?.wishlist?.loading);
  const cartLoading = useSelector((state) => state?.cart?.loading);
  const authLoading = useSelector((state) => state?.auth?.loading);
  const adminLoading = useSelector((state) => state?.admin?.loading);
  const promoLoading = useSelector((state) => state?.promo?.loading);

  const loadingStates = [
    productLoading,
    userLoading,
    wishlistLoading,
    cartLoading,
    authLoading,
    adminLoading,
    promoLoading,
  ];

  const isLoading = loadingStates.some((loading) => loading === true);

  const progress = isLoading ? 100 : 0;
  
  return (
    <LoadingBar
      color="#f11946"
      progress={progress}
      onLoaderFinished={() => {}}
    />
  );
};

export default TopLoadBar;
