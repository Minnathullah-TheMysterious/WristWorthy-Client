import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import LoggedInCheckLoader from "../loaders/LoggedInCheckLoader";

const UserProtectedRoute = () => {
  const [ok, setOk] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

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

  return ok ? <Outlet /> : <LoggedInCheckLoader />;
};

export default UserProtectedRoute;
