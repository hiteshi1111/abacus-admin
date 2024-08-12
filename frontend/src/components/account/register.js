import React from "react";
import { Link } from "react-router-dom";
import redCross from "../../assets/icons/redCross.svg";
import greenTick from "../../assets/icons/greenTick.svg";

const Register = ({
    error,
    email,
    phone,
    referredBy,
    setError = () => { },
    inputValidated,
    emailValidation = () => { },
    setReferredBy = () => { },
    registerationHandler = () => { },
    confirmPassword,
    setAadharNo = () => { },
    setConfirmPassword = () => { },
    password,
    setPassword = () => { },
    aadharNo,
    pan,
    setPan = () => { },
    setPhone = () => { }
}) => {
    return (
        <div className="max-w-[600px] p-[40px] my-[40px] mx-auto rounded-[10px] relative z-9 bg-white w-full grid">
            <h1 className="uppercase text-center">Register</h1>

            <p className={`text-[16px] text-left text-[#FF0000] font-semibold mb-[10px] ${error ? 'block' : 'hidden '}`}>Error: {error}</p>
            <label htmlFor="refId" className="flex mb-[5px] text-[15px] font-bold items-center">Referrence ID</label>
            <input
                className="inpit_row form-input"
                name="refId"
                value={referredBy}
                disabled={referredBy ? true : false}
                onChange={(e) => {
                    setReferredBy(e.target.value);
                    setError(null);
                }}
            />
            <label htmlFor="email" className="flex mb-[5px] text-[15px] font-bold items-center">Email</label>
            <div className="inpit_row flex gap-[10px] items-center">
                <input
                    className="form-input"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => emailValidation(e.target.value)}
                />
                {email.length > 6 ? (
                    !inputValidated.email ? (
                        <img
                            src={redCross}
                            alt="error"
                            className="h-[32px]"
                            width=""
                            height=""
                        />
                    ) : (
                        <img
                            src={greenTick}
                            alt="validated"
                            className="h-[32px]"
                            width=""
                            height=""
                        />
                    )
                ) : null}
            </div>
            <label htmlFor="phone" className="flex mb-[5px] text-[15px] font-bold items-center">Phone</label>
            <div className="inpit_row flex gap-[10px] items-center">
                <input
                    maxLength="10"
                    pattern="\d*"
                    type="text"
                    className="form-input"
                    name="phone"
                    value={phone}
                    onChange={(e) => {
                        setPhone(e.target.value);
                        setError(null);
                    }}
                />
                {phone.length > 5 ? (
                    !inputValidated.phone ? (
                        <img
                            src={redCross}
                            alt="error"
                            className="h-[32px]"
                            width=""
                            height=""
                        />
                    ) : (
                        <img
                            src={greenTick}
                            alt="validated"
                            className="h-[32px]"
                            width=""
                            height=""
                        />
                    )
                ) : null}
            </div>
            <label htmlFor="panCard" className="flex mb-[5px] text-[15px] font-bold items-center">PAN No.</label>
            <div className="inpit_row flex gap-[10px] items-center">
                <input
                    maxLength={10}
                    className="form-input"
                    name="panCard"
                    value={pan}
                    onChange={(e) => {
                        setPan(e.target.value);
                        setError(null);
                    }}
                />
                {pan.length > 5 ? (
                    !inputValidated.pan ? (
                        <img
                            src={redCross}
                            alt="error"
                            className="h-[32px]"
                            width=""
                            height=""
                        />
                    ) : (
                        <img
                            src={greenTick}
                            alt="validated"
                            className="h-[32px]"
                            width=""
                            height=""
                        />
                    )
                ) : null}
            </div>
            <label htmlFor="aadhar" className="flex mb-[5px] text-[15px] font-bold items-center">AadharCard No.</label>
            <div className="inpit_row flex gap-[10px] items-center">
                <input
                    maxLength={12}
                    className="form-input"
                    name="aadhar"
                    value={aadharNo}
                    onChange={(e) => {
                        setAadharNo(e.target.value);
                        setError(null);
                    }}
                />
                {aadharNo.length > 5 ? (
                    !inputValidated.aadhar ? (
                        <img
                            src={redCross}
                            alt="error"
                            className="h-[32px]"
                            width=""
                            height=""
                        />
                    ) : (
                        <img
                            src={greenTick}
                            alt="validated"
                            className="h-[32px]"
                            width=""
                            height=""
                        />
                    )
                ) : null}
            </div>
            <label htmlFor="password" className="flex mb-[5px] text-[15px] font-bold items-center">Password</label>
            <div className="inpit_row flex gap-[10px] items-center">
                <input
                    className="form-input"
                    name="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setError(null);
                    }}
                />
                {password.length >= 6 ? (
                    !inputValidated.pass ? (
                        <img
                            src={redCross}
                            alt="error"
                            className="h-[32px]"
                            width=""
                            height=""
                        />
                    ) : (
                        <img
                            src={greenTick}
                            alt="validated"
                            className="h-[32px]"
                            width=""
                            height=""
                        />
                    )
                ) : null}
            </div>
            <label htmlFor="confirmPassword" className="flex mb-[5px] text-[15px] font-bold items-center">Confirm Password</label>
            <div className="inpit_row flex gap-[10px] items-center">
                <input
                    className="form-input"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setError(null);
                    }}
                />
                {confirmPassword.length >= 3 ? (
                    !inputValidated.confirmPass ? (
                        <img
                            src={redCross}
                            alt="error"
                            className="h-[32px]"
                            width=""
                            height=""
                        />
                    ) : (
                        <img
                            src={greenTick}
                            alt="validated"
                            className="h-[32px]"
                            width=""
                            height=""
                        />
                    )
                ) : null}
            </div>
            <button className="bg-[#0d3b89] text-white mt-[10px] h-[50px] text-[18px]" onClick={registerationHandler}>
                Register
            </button>
            <p className="text-[16px] text-center mt-[15px]">Already have an  account? <Link to="/account?login=true" className="font-medium text-[#071d43] hover:text-[#0e57d5]">Login</Link></p>
        </div>
    )
}

export default Register;