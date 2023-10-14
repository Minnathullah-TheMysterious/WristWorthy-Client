import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import LoggedInCheckLoader from "../loaders/LoggedInCheckLoader";

const UserProtectedRoute = () => {
  const navigate = useNavigate()
  const [ok, setOk] = useState(true);

  useEffect(() => {
    const authCheck = async () => {
      try {
        const { data } = await axios.get("/api/v1/auth/authenticate-user");
        if (data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        setOk(false)
      }
    };
    authCheck();
  }, [navigate]);

  return ok ? <Outlet /> : <LoggedInCheckLoader />;
};

export default UserProtectedRoute;
