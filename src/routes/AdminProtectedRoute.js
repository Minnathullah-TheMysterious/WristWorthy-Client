import axios from "axios";
import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminCheckLoader from "../loaders/AdminCheckLoader";

const AdminProtectedRoute = () => {
  const navigate = useNavigate()
  const [ok, setOk] = useState(true);

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
        setOk(false);
      }
    };
    adminCheck();
  }, [navigate]);

  return ok ? <Outlet /> : <AdminCheckLoader />;
};

export default AdminProtectedRoute;
