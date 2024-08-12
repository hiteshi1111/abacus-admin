import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const CustomerRoute = () => {
    const cookieData = sessionStorage.getItem("xios") || "";
    const role = cookieData && JSON.parse(cookieData)?.role;
    return (
        <>
        {cookieData && role.toLowerCase() === "customer" ? (
            <Outlet />
        ) : (
            <Navigate to="/" replace />
        )}
        </>
    );
};

export default CustomerRoute;