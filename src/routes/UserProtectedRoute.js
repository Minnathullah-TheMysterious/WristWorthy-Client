import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import LoggedInCheckLoader from "../loaders/LoggedInCheckLoader";
import toast from "react-hot-toast";

const UserProtectedRoute = () => {
  const [ok, setOk] = useState(false);
  console.log("user check");

  useEffect(() => {
    const authCheck = async () => {
      try {
        const { data } = await axios.get("/api/v1/auth/authenticate-user");
        if (data.ok) {
          console.log("user check successful");
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error(error.message);
        toast.error("Token expired, Please Login Again");
      }
    };
    authCheck();
  }, []);

  return ok ? <Outlet /> : <LoggedInCheckLoader />;
};

export default UserProtectedRoute;
