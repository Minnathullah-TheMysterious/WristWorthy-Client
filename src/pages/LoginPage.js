import React, { useEffect } from "react";
import Login from "../features/auth/components/Login";
import Layout from "../features/layout/Layout";

const LoginPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Layout pageTitle={"WristWorthy - Login"}>
      <Login />
    </Layout>
  );
};

export default LoginPage;
