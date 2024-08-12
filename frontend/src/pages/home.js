import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PostRequest } from "../utils/requests";
import { AccountContext } from "../App";
import Loader from "../components/shared/loader";
import { checkEmptyFields, validateEmail } from "../utils/formFunctions";
import abacusLogo from '../assets/images/small_logo.svg';
import TextInput from "../components/custom/textInput";
import { FaRegEye, FaRegEyeSlash  } from "react-icons/fa";
import IconButton from "../components/custom/iconButton";
import ActionButton from "../components/custom/actionButton";

const Home = () => {
    const navigate = useNavigate();
    const [loc, setLoc] = useState({
        latitude: "",
        longitude: ""
    });
    const [showPass, setShowPass] = useState({
        pass: false,
        confirmPass: false
    });
    const [loginInput, setLoginInput] = useState({
        email: '',
        password: ""
    });
    const [error, setError] = useState({
        email: false,
        pass: false,
        message: ""
    });
    const [disabled, setDisabled] = useState(false);
    const { login, setLogin, role } = useContext(AccountContext);

    //CHECKS IF ROLE IS ADMIN OR NOT
    useEffect(() => {
        if (login){
            if (role==="admin"){
                navigate("/admin/dashboard");
            }else{
                navigate("/dashboard");
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[login]);

    //FETCHES USER LOCATION
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLoc({latitude: position.coords?.latitude, longitude: position.coords?.longitude});
                },
                (error) => {
                    setLoc({latitude: "", longitude: ""});
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);

    //LOGIN FUNCTIONALITY
    function loginHandler() {
        setDisabled(true);
        setError(prevState => ({...prevState, message: ""}));
        if (checkEmptyFields(loginInput)) {
            setError(prevState => ({...prevState, message: "Fields must not be empty!"}));
            setDisabled(false);
        }else if (!validateEmail(loginInput.email)){
            setError(prevState => ({...prevState, email: true, message: "Email is invalid!"}));
            setDisabled(false);
        }else{
            PostRequest(process.env.REACT_APP_API_URL + 'user/login', {
                email: loginInput.email,
                password: loginInput.password,
                latitude: loc.latitude,
                longitude: loc.longitude
            }).then(response => {
                setLogin(true);
                if (response.data) {
                    sessionStorage.setItem("xios", JSON.stringify(response.data?.data));
                    if (response.data.data.role==="admin"){
                        navigate("/admin/dashboard");
                    }else{
                        navigate("/dashboard");
                    }
                }
            }).catch(error => {
                console.log(error)
                setError(prevState => ({...prevState, message: error?.data || "Something went wrong. Try again later!"}));
                setDisabled(false);
            });
        }
    }
    
    return(
        <div className="bg-[#000] min-h-screen flex justify-center items-center bg-gradient-to-bl from-[#071D43] to-[#071D43] via-blue-50">
            <div className="border max-w-[600px] py-[40px] px-[20px] md:p-[40px] mx-[15px] md:mx-auto rounded-[5px] relative z-9 bg-white w-full grid shadow-md">
                {disabled && (<Loader />)}
                <Link to="https://www.theabacus.in/" className="logo_icon text-center mx-auto mb-[10px]">
                    <img 
                        className="h-[80px]" 
                        src={abacusLogo} 
                        alt="Logo" 
                        height="" 
                        width="" 
                    />
                </Link>
                <h1 className="text-center uppercase text-[24px] font-extrabold mb-[10px]">Login</h1>
                <p className={`text-[14px] text-left text-[#FF0000] font-semibold mb-[5px] ${error.message ? 'block' : 'hidden'}`}>{error.message}</p>
                <label htmlFor="email" className="flex mb-[5px] text-[15px] font-bold items-center">Email</label>
                <TextInput
                    type="email"
                    disabled={disabled}
                    error={error.email}
                    value={loginInput.email}
                    onChange={(e) => {
                        setLoginInput(prevState => ({ ...prevState, email: e.target.value }));
                        setError(prevState => ({...prevState, email: false, message: "" }));
                    }}
                />
                <label htmlFor="password" className="flex mb-[5px] text-[15px] font-bold items-center mt-[10px]">Password</label>
                <div className="relative">
                    <TextInput
                        type={showPass.pass ? "text" : "password"}
                        disabled={disabled}
                        error={error.pass}
                        value={loginInput.password}
                        onChange={(e) => {
                            setLoginInput(prevState => ({ ...prevState, password: e.target.value }));
                            setError(prevState => ({...prevState, password: false, message: "" }));
                        }}
                    />
                    <IconButton 
                        icon={showPass.pass ? <FaRegEyeSlash size={15} /> : <FaRegEye size={15} />}
                        onClick={() => setShowPass(prevState => ({ ...prevState, pass: !showPass.pass }))}
                        className="absolute right-[5px] inset-y-0 lg:inset-y-[3px]"
                    />
                </div>
                <ActionButton 
                    title={disabled ? "Logging in..." : "Login"}
                    onClick={loginHandler}
                    disabled={disabled}
                    className="mt-[30px]"
                />
                <p className="text-[16px] text-center mt-[15px] mb-[0]">Don't have an account? <Link to="/register" className="font-medium text-[#0e57d5] hover:underline">Register</Link></p>
            </div>
        </div>
    )
}

export default Home;