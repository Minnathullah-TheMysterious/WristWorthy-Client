import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Loader from "../../../app/Loader";

const ProtectedRoute = () => {
  const [ok, setOk] = useState();

  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    const authCheck = async () => {
      const { data } = await axios.get("/api/v1/auth/user-auth", {
        headers: {
          Authorization: user?.token,
        },
      });
      if (data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (user?.token) authCheck();
  }, [user?.token]);

  return ok? <Outlet/> : <Loader/>
};

export default ProtectedRoute;
