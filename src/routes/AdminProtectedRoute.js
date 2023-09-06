import axios from "axios";
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminCheckLoader from "../loaders/AdminCheckLoader";

const AdminProtectedRoute = () => {
  const [ok, setOk] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const adminCheck = async () => {
      const { data } = await axios.get("/api/v1/auth/admin-auth", {
        headers: {
          Authorization: user?.token,
        },
      });
      const { ok } = data;
      if (ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    user && user.token && adminCheck();
  }, [user]);

  return ok ? <Outlet /> : <AdminCheckLoader />;
};

export default AdminProtectedRoute;
