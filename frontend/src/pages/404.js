import React from "react";
import { Link } from "react-router-dom";
import Layout from "../layout";

const NotFound = () => {
    const cookieData = sessionStorage.getItem("xios") || "";
    const role = cookieData && JSON.parse(cookieData)?.role;
    return (
        <Layout>
            <div className="text-center h-[80vh] flex justify-center items-center flex-col">
                <h1 className="text-center text-[80px]">404</h1>
                <div className="mt-[30px]">
                    <h3 className="text-[30px] md:text-[40px]">Looks like you're lost!</h3>
                    <p className="text-[16px] mt-[5px]">The page you are looking for, is not available!</p>
                    <Link to={cookieData && role.toLowerCase() === "admin" ? "/admin/dashboard" : "/dashboard"} className="text-[#fff] px-[20px] py-[10px] bg-[#39ac31] mt-[20px] inline-block rounded-full text-[14px]">Go to Dashboard</Link>
                </div>
            </div>
        </Layout>
    )
}

export default NotFound;