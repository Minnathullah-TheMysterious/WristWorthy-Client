import React, { useEffect } from "react";
import Layout from "../features/layout/Layout";
import ManageUserAddresses from "../features/user/components/ManageUserAddresses";

const UserAddressesPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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
