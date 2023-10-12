import React, { useEffect } from "react";
import CreatePromo from "../../features/admin/components/CreatePromo";
import Layout from "../../features/layout/Layout";

const CreatePromoPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  
  return (
    <>
      <Layout pageTitle={'WristWorthy - Create Promo'}>
        <CreatePromo />
      </Layout>
    </>
  );
};

export default CreatePromoPage;
