import React from "react";
import Loader from "../shared/loader";
import abacusLogo from '../../assets/images/small_logo.svg';
import { Link } from "react-router-dom";
import TextInput from "../custom/textInput";
import Label from "../custom/label";
import ActionButton from "../custom/actionButton";

const OTP = ({fullName, otp, error, setOtp=()=>{}, setError=()=>{}, otpVerification=()=>{}, disabled=false, email=""}) => {
    return(
        <div>
            <div className="relative min-w-[600px] py-[40px] px-[20px] md:p-[40px] my-[40px] mx-[15px] md:my-[40px] md:mx-auto rounded-[5px] z-9 bg-white w-full grid shadow-md">
                {disabled && (<Loader />)}
                <Link to="/" className="logo_icon text-center mx-auto mb-[30px]">
                    <img className="h-[80px]" src={abacusLogo} alt="Logo" height="" width="" loading="lazy" />
                </Link>
                <h2 className="text-center uppercase text-[24px] font-extrabold">Welcome {fullName}!</h2>
                <p className="w-full text-center my-[10px] text-[14px]">One Time Password has been sent to {email}</p>
                <p className="w-full text-center mb-[10px] text-[14px]">Do not refresh the page!</p>

                <p className={`text-[14px] text-left text-[#FF0000] font-semibold mb-[15px] ${error?.message ? 'block' : 'hidden'}`}>{error?.message}</p>
                <Label
                    htmlFor="otp"
                    title="Enter OTP"
                />
                <TextInput
                    disabled={disabled}
                    error={error.otp}
                    value={otp}
                    onChange={(e) => {
                        setOtp(e.target.value);
                        setError(prevState => ({...prevState, otp: false, message: "" }));
                    }}
                />
                <ActionButton
                    title={disabled ? "Saving..." : "Submit"}
                    onClick={otpVerification}
                    disabled={disabled}
                    className="mt-[30px]"
                />
            </div>
        </div>
    )
}

export default OTP;