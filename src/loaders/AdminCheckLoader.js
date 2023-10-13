import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AdminCheckLoader = () => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((pastValue) => --pastValue);
    }, 1000);
    count === 0 &&
      navigate("/login", {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location]);

  return (
    <>
      <div className="flex flex-col justify-center items-center h-[100vh]">
      <p className="text-lg font-serif">Not An Admin. <span className="font-bold text-red-800">Unauthorized Access</span></p>
        <p className="text-lg font-serif">
          Redirecting you in {count} {count === 1 ? "second" : "seconds"}.
          Please wait...
        </p>
        <img src="/images/spinner.gif" alt="Loading..." />
      </div>
    </>
  );
};

export default AdminCheckLoader;
