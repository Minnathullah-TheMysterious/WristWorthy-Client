import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Loader from "../../../app/Loader";

const ProtectedRoute = () => {
  const user = useSelector(state => state.auth.user);
  console.log('User Info: ',user);
  const [ok, setOk] = useState();

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
