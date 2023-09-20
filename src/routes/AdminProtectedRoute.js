import axios from "axios";
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminCheckLoader from "../loaders/AdminCheckLoader";
import { toast } from "react-hot-toast";

const AdminProtectedRoute = () => {
  const [ok, setOk] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const adminCheck = async () => {
      try {
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
      } catch (error) {
        toast.error("Token expired, Please Login Again");
        localStorage.removeItem("user");
        window.location.reload();
      }
    };
    user && user.token && adminCheck();
  }, [user]);

  return ok ? <Outlet /> : <AdminCheckLoader />;
};

export default AdminProtectedRoute;
