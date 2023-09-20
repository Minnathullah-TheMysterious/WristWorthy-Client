import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import LoggedInCheckLoader from "../loaders/LoggedInCheckLoader";
import toast from "react-hot-toast";

const UserProtectedRoute = () => {
  const [ok, setOk] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const authCheck = async () => {
      try {
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
      } catch (error) {
        toast.error("Token expired, Please Login Again");
        localStorage.removeItem("user");
        window.location.reload();
      }
    };

    if (user?.token) authCheck();
  }, [user?.token]);

  return ok ? <Outlet /> : <LoggedInCheckLoader />;
};

export default UserProtectedRoute;
