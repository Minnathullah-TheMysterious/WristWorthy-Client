import React, { useEffect } from "react";
import Register from "../features/auth/components/Register";
import Layout from "../features/layout/Layout";

const RegisterPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <Layout pageTitle={"WristWorthy - Register"}>
      <Register />
    </Layout>
  );
};

export default RegisterPage;
