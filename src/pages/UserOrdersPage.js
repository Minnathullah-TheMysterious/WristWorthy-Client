import React from "react";
import UserOrders from "../features/user/components/UserOrders";
import Layout from "../features/layout/Layout";

const UserOrdersPage = () => {
  return (
    <Layout pageTitle={"WristWorthy - My Orders"}>
      <div className="pb-10">
        <h1 className="font-serif text-center text-5xl shadow py-5">
          My Orders
        </h1>
        <UserOrders />
      </div>
    </Layout>
  );
};

export default UserOrdersPage;
