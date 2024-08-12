import React from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import { Paper } from "@mui/material";

const Card = ({index, title, blocks, rentalAmount, rentalDuration, price}) => {
    const cookieData = sessionStorage.getItem("xios") || "";
    const role = cookieData && JSON.parse(cookieData)?.role;
    return (
        <Grid key={index} item lg={4} md={4} sm={6} xs={12} className={`${role==="admin" && "hover:border-[#4B78A8] hover:border-[2px]"}`}>
            <Paper>      
                <h3 className="!mb-0 text-center w-full bg-[#aaa] h-[50px] flex justify-center items-center">{title}</h3>
                <div className="py-[20px] px-[30px]">
                    <p className="text-[16px]"><CheckIcon /> <span>Number of Block(s): </span> {blocks}</p>
                    <p className="text-[16px]"><CheckIcon /> Assured Rental: {rentalAmount}</p>
                    <p className="text-[16px]"><CheckIcon /> <span>Rental Duration: </span> {rentalDuration}</p>
                    {role === "admin" ? (
                        <div className="flex gap-[20px]">
                            <Button variant="contained" size="large" className="w-full !text-[16px]">Edit</Button>
                            <Button variant="contained" size="large" color="error" className="w-full !text-[16px]">Delete</Button>
                        </div>
                    ) : (
                        <Button variant="contained" size="large" className="w-full !text-[16px]">Purchase @ {price}</Button>
                    )}
                    {role !== "admin" && (
                        <p className="text-right mt-[10px] !mb-0">*GST Included</p>
                    )}
                </div>
            </Paper>
        </Grid>
    )
}

export default Card;