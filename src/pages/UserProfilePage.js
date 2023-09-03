import React from "react";
import Layout from "./../features/layout/Layout";
import UserProfile from "../features/user/components/UserProfile";

const UserProfilePage = () => {
  return (
    <Layout pageTitle={"WristWorthy - My Profile"}>
      <h1 className="font-serif text-center text-5xl shadow py-5">
        My Profile
      </h1>
      <UserProfile />
    </Layout>
  );
};

export default UserProfilePage;
