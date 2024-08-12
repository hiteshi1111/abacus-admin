import React, { useContext, useState } from "react";
import { PostRequest } from "../../utils/requests";
import { AccountContext } from "../../App";
import Layout from "../../layout";

const Security = () => {
    const { userData } = useContext(AccountContext);
    const [error, setError] = useState({
        pass: "",
        forgetPass: ""
    });
    const [disabled, setDisabled] = useState({
        pass: false,
        forgetPass: false
    });
    const [passInput, setPassInput] = useState({
        oldPass: "",
        newPass: "",
        confirmNewPass: ""
    });

    function passwordHandler(){
        setError(prevState => ({ ...prevState, pass: "" }));
        setDisabled(prevState => ({ ...prevState, pass: true }));
        if (!passInput.oldPass || !passInput.newPass || !passInput.confirmNewPass){
            setDisabled(prevState => ({ ...prevState, pass: false }));
            setError(prevState => ({ ...prevState, pass: "Fields must not be empty!" }));
        }else if(passInput.newPass !== passInput.confirmNewPass) {
            setDisabled(prevState => ({ ...prevState, pass: false }));
            setError(prevState => ({ ...prevState, pass: "Confirm password shold match new password!" }));
        }else{
            PostRequest(process.env.REACT_APP_API_URL + 'password/update',{
                email: userData?.email,
                oldPassword: passInput.oldPass,
                newPassword: passInput.newPass
            }).then(response => {
                setDisabled(prevState => ({ ...prevState, pass: true }));
                setError(prevState => ({ ...prevState, pass: "" }));
            }).catch(err => {
                setError(err.data.error);
                setDisabled(false);
            })
        }
    }           

    return(
        <Layout>
            <h2 className="capitalize text-[25px] leading-[92.857%] font-bold text-[#21407E] w-full md:mb-[50px] mb-[30px]">Security Settings</h2>
            <p className={`mt-[30px] text-[16px] text-left text-[#FF0000] font-semibold ${error.pass ? 'block' : 'hidden '}`}>Error: {error.pass}</p>
            <div className="flex md:flex-nowrap flex-wrap md:gap-[50px] gap-0 justify-start mt-[10px]">
                <h3 className="text-[18px] min-w-[150px]">Update Password</h3>
                <form className="w-full sm:flex-nowrap flex-wrap flex sm:gap-[30px] gap-0">
                    <div className="w-full md:max-w-[300px] max-w-[100%]">
                        <div className="mb-5">
                            <label for="password" className="block tracking-wide text-gray-700 text-[16px] font-bold mb-2">Old password</label>
                            <input 
                                disabled={disabled.pass}
                                type="password" 
                                id="password" 
                                value={passInput.oldPass}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                                required
                                placeholder="***********"
                                onChange={(e) => {
                                    setPassInput(prevState => ({ ...prevState, oldPass: e.target.value }));
                                    setError(prevState => ({ ...prevState, pass: "" }));
                                }}
                            />
                        </div>
                        <div className="mb-5">
                            <label for="new-password" className="block tracking-wide text-gray-700 text-[16px] font-bold mb-2">New password</label>
                            <input 
                                type="password" 
                                disabled={disabled.pass}
                                id="new-password" 
                                value={passInput.newPass}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                                required
                                placeholder="***********"
                                onChange={(e) => setPassInput(prevState => ({ ...prevState, newPass: e.target.value }))}
                            />
                        </div>
                    </div>
                    <div className="w-full md:max-w-[300px] max-w-[100%]">
                        <div className="mt-1">
                            <label for="repeat-password" className="block tracking-wide text-gray-700 text-[16px] font-bold mb-2">Repeat new password</label>
                            <input 
                                type="password" 
                                disabled={disabled.pass}
                                id="repeat-password" 
                                value={passInput.confirmNewPass}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                                required
                                placeholder="***********"
                                onChange={(e) => {
                                    setPassInput(prevState => ({ ...prevState, confirmNewPass: e.target.value }));
                                    setError(prevState => ({ ...prevState, pass: "" }));   
                                }}
                            />
                        </div>
                        <p className="text-[12px] text-[#aaa] mb-3">Note: You will be logged out of current session after changing password.</p>
                        <button 
                            type="button" 
                            className="text-white text-[18px] h-[46px] bg-[#21407E] hover:bg-[#061C42] focus:ring-4 focus:outline-none focus:ring-blue-300 font-large rounded-lg px-8 py-2.5 text-center"
                            onClick={passwordHandler}
                        >Change Password</button>
                    </div>
                </form>
            </div>
            <ForgetPassword
                error={error.forgetPass}
                setError={setError}
                disabled={disabled.forgetPass}
                setDisabled={setDisabled}
                email={userData?.email}
            />
        </Layout>
    )
}

function ForgetPassword({error, setError=()=>{}, disabled, setDisabled=()=>{}, email}) {
    const [otp, setOtp] = useState("");
    const [show, setShow] = useState(false);

    function submitHandler(){
        setShow(true);
    }
    function verifyOtpHandler(){

    }
    return(
        <div className="flex md:flex-nowrap flex-wrap md:gap-[50px] gap-0 justify-start md:mt-[50px] mt-[40px]">
            <h3 className="text-[18px] min-w-[150px]">Forgot Password</h3>
            <form className="w-full">
                <p className={`text-[14px] text-left text-[#FF0000] font-semibold mb-[10px] ${error ? 'block' : 'hidden '}`}>Error: {error.pass}</p>
                <div className="flex sm:flex-nowrap flex-wrap items-end md:gap-[30px] gap-[20px]">
                    <div className="w-full md:max-w-[300px] max-w-[100%]">
                        <label for="email" className="block tracking-wide text-gray-700 text-[16px] font-bold mb-2">Your email</label>
                        <input 
                            disabled
                            type="email" 
                            id="email" 
                            value={email}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                            required
                        />
                    </div>
                    <button 
                        type="button" 
                        className="text-white min-w-[150px] text-[18px] h-[46px] bg-[#21407E] hover:bg-[#061C42] focus:ring-4 focus:outline-none focus:ring-blue-300 font-large rounded-lg px-8 py-2.5 text-center"
                        onClick={submitHandler}
                    >Send OTP</button>
                </div>
                {show && (<p className="text-[#008000] mt-2">OTP has been sent to your mail {email}</p>)}
                {show && (
                    <div className="flex sm:flex-nowrap flex-wrap items-end md:gap-[30px] gap-[20px] mt-[10px]">
                        <div className="w-full md:max-w-[300px] max-w-[100%]">
                            <label for="otp" className="block tracking-wide text-gray-700 text-[16px] font-bold mb-2">Enter OTP</label>
                            <input 
                                disabled={disabled}
                                id="otp" 
                                value={otp}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                                required
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>
                        <button 
                            type="button" 
                            className="text-white min-w-[150px] text-[18px] h-[46px] bg-[#21407E] hover:bg-[#061C42] focus:ring-4 focus:outline-none focus:ring-blue-300 font-large rounded-lg px-8 py-2.5 text-center"
                            onClick={verifyOtpHandler}
                        >Verify</button>
                    </div>
                )}
            </form>
        </div>
    )
}

export default Security;