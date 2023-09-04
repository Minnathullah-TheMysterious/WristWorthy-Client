import React from "react";
import Layout from "../features/layout/Layout";
import ManageUserAddresses from "../features/user/components/ManageUserAddresses";

const UserAddressesPage = () => {
  return (
    <Layout pageTitle={"WristWorthy - Manage Addresses"}>
      <div>
      <h1 className="font-serif text-center text-5xl shadow py-5">Manage Your Addresses</h1>
        <ManageUserAddresses />
      </div>
    </Layout>
  );
};

export default UserAddressesPage;
