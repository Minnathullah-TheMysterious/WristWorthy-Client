import axios from "axios";
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminCheckLoader from "../loaders/AdminCheckLoader";
import { toast } from "react-hot-toast";

const AdminProtectedRoute = () => {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const adminCheck = async () => {
      try {
        const { data } = await axios.get("/api/v1/auth/authenticate-admin");
        const { ok } = data;
        if (ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error(error.message);
        toast.error("Token expired, Please Login Again");
      }
    };
    adminCheck();
  }, []);

  return ok ? <Outlet /> : <AdminCheckLoader />;
};

export default AdminProtectedRoute;
