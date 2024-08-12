import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const AdminRoute = () => {
  const cookieData = sessionStorage.getItem("xios") || "";
  const role = cookieData && JSON.parse(cookieData)?.role;
  return (
    <>
      {cookieData && role.toLowerCase() === "admin" ? (
        <Outlet />
      ) : (
        <Navigate to="/" replace />
      )}
    </>
  );
};

export default AdminRoute;