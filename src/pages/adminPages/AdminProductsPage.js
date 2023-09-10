import React from "react";
import AdminProductListing from "../../features/admin/components/AdminProductListing";
import Layout from "../../features/layout/Layout";

const AdminProductsPage = () => {
  return (
    <Layout pageTitle={"WristWorthy - Admin Products"}>
      <AdminProductListing />
    </Layout>
  );
};

export default AdminProductsPage;
