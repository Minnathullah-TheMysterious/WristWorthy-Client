import React, { useEffect } from "react";
import AdminProductListing from "../../features/admin/components/AdminProductListing";
import Layout from "../../features/layout/Layout";

const AdminProductsPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Layout pageTitle={"WristWorthy - Admin Products"}>
      <AdminProductListing />
    </Layout>
  );
};

export default AdminProductsPage;
