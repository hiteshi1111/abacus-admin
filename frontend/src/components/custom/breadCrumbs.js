import { Breadcrumbs as Bread } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const BreadCrumbs = ({pages, white=false}) => {
    return(
        <Bread aria-label="breadcrumb" className={`py-[30px] w-full flex justify-center text-[14px] ${white ? "!text-[#fff]" : "!text-[#000]"}`}>
            <Link underline="hover" color="inherit" to="/" className="hover:underline">
                Home
            </Link>
            {pages.length > 0 && pages.map((item, i) => (
                <Link
                    key={i}
                    underline="hover"
                    color="inherit"
                    to={item.handle}
                    className={`${item.handle ? "hover:underline" : "cursor-default"}`}
                >
                    {item.title}
                </Link>
            ))}
        </Bread>
    )
}

export default BreadCrumbs;