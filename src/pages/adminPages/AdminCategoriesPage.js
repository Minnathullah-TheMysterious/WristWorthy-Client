import React from "react";
import Layout from "../../features/layout/Layout";
import AdminCategoryListing from "../../features/admin/components/AdminCategoryListing";

const AdminCategoriesPage = () => {
  return (
    <Layout pageTitle={"WristWorthy - Admin Categories"}>
      <AdminCategoryListing
        wrapClass={
          "mt-6 space-y-2 lg:grid lg:grid-cols-6 lg:gap-x-6 sm:grid sm:grid-cols-3 sm:gap-x-3 grid grid-cols-2 gap-x-2  md:grid md:grid-cols-4 md:gap-x-4"
        }
      />
    </Layout>
  );
};

export default AdminCategoriesPage;
