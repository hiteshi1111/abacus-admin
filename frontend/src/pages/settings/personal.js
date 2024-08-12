import React, { useContext } from "react";
import { AccountContext } from "../../App";
import TextField from '@mui/material/TextField';
import { Button, Grid } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Layout from "../../layout";

const states = [
    {
        value: 'New Mexico',
        label: 'New Mexico',
    },
    {
        value: 'Missouri',
        label: 'Missouri',
    },
    {
        value: 'Texas',
        label: 'Texas',
    },
];

const countrys = [
    {
        value: 'India',
        label: 'India',
    },
    {
        value: 'USA',
        label: 'USA',
    },
    {
        value: 'Canada',
        label: 'Canada',
    },
];

const Personal = () => {
    const { userData } = useContext(AccountContext);
    return (
        <Layout>
            <h2 className="capitalize text-[25px] leading-[92.857%] font-bold text-[#21407E] w-full">Profile Settings</h2>
            <div className="flex flex-wrap gap-[50px] justify-start mt-[30px]">
                <form className="w-full bg-[#f7f7f7] md:p-[50px] p-[30px]">

                    <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item sm={6} xs={12}>
                            <TextField
                                fullWidth
                                id="fullName"
                                label="Full Name"
                                type="text"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                placeholder={userData?.fullName}
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <TextField
                                fullWidth
                                id="email"
                                label="Email"
                                type="email"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                placeholder={userData?.email}
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <TextField
                                fullWidth
                                id="panNumber"
                                label="PAN"
                                type="text"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <TextField
                                fullWidth
                                id="aadhar"
                                label="Aadhar No."
                                type="text"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <TextField
                                fullWidth
                                id="phone"
                                label="Phone"
                                type="number"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <TextField
                                fullWidth
                                id="fullAddress"
                                label="Full Address"
                                type="email"
                                placeholder={userData?.address}
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <TextField
                                fullWidth
                                id="state"
                                select
                                label="State"
                                defaultValue="New Mexico"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            >
                                {states.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <TextField
                                fullWidth
                                id="country"
                                select
                                label="Country"
                                defaultValue="India"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            >
                                {countrys.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" size="large" className="h-[50px]" disableElevation>
                                Submit
                            </Button>
                        </Grid>
                    </Grid> 
                </form>
            </div>
        </Layout>
    )
}

export default Personal;