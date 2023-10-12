import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import LoggedInCheckLoader from "../loaders/LoggedInCheckLoader";
import toast from "react-hot-toast";

const UserProtectedRoute = () => {
  const navigate = useNavigate()
  const [ok, setOk] = useState(false);

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
        navigate('/login')
      }
    };
    authCheck();
  }, [navigate]);

  return ok ? <Outlet /> : <LoggedInCheckLoader />;
};

export default UserProtectedRoute;
