import React, { useEffect } from "react";
import Layout from "./../features/layout/Layout";
import UserProfile from "../features/user/components/UserProfile";

const UserProfilePage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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
