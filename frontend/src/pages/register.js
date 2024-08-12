import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {useNavigate, useLocation} from "react-router-dom";
import { PostRequest } from "../utils/requests";
import OTP from "../components/account/otp";
import stdCodes from "../data/stdCodes.json";
import { AccountContext } from "../App";
import { checkEmptyFields, validateAadhar, validateEmail, validatePan, validatePassword, validatePhone, validateReferrenceId } from "../utils/formFunctions";
import Loader from "../components/shared/loader";
import abacusLogo from '../assets/images/small_logo.svg';
import TextInput from "../components/custom/textInput";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import ActionButton from "../components/custom/actionButton";
import IconButton from "../components/custom/iconButton";
import Label from "../components/custom/label";

const Register = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const ref = params.get('ref') || "";

    const [formInput, setFormInput] = useState({
        referredBy: "",
        email: "",
        phone: "",
        pan: "",
        aadhar: "",
        password: "",
        confirmPassword: "",
        fullName: "",
        stdCode: "+91",
        state: "",
        aadharStatus: false,
        panStatus: false,
        otp: ""
    })
    const [error, setError] = useState({
        referredBy: false,
        email: false,
        phone: false,
        pan: false,
        aadhar: false,
        password: false,
        confirmPassword: false,
        otp: false,
        message: ""
    });
    const [showPass, setShowPass] = useState({
        pass: false,
        confirmPass: false
    })
    const [otp, setOtp] = useState("");
    const [showOtp, setShowOtp] = useState(false);
    const [disabled, setDisabled] = useState({
        register: false,
        otp: false
    });

    const { login } = useContext(AccountContext);

    const customData = {
        email: formInput.email,
        phone: formInput.phone,
        pan: formInput.pan,
        aadhar: formInput.aadhar,
        password: formInput.password,
        confirmPassword: formInput.confirmPassword
    }

    useEffect(() => {
        if (login) {
            navigate("/account/dashboard");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [login]);

    useEffect(() => {
        setFormInput(prevState => ({ ...prevState, referredBy: ref }));
    }, [ref]);

    function validationHandler() {
        setDisabled(prevState => ({ ...prevState, register: true }));
        setError(prevState => ({ 
            ...prevState, 
            referredBy: false,
            email: false,
            phone: false,
            pan: false,
            aadhar: false,
            password: false,
            confirmPassword: false,
            message: "" 
        }));
        if (checkEmptyFields(customData)) {
            setError(prevState => ({...prevState, message: "Fields must not be empty!"}));
            setDisabled(prevState => ({...prevState, register: false}));
        }else if (!validateEmail(formInput.email)){
            setError(prevState => ({...prevState, email: true, message: "Email is invalid!"}));
            setDisabled(prevState => ({...prevState, register: false}));
        }else if (!validateReferrenceId(formInput.referredBy)){
            setError(prevState => ({...prevState, referredBy: true, message: "Referrence ID must be of 6 characters!"}));
            setDisabled(prevState => ({...prevState, register: false}));
        }else if (!validatePan(formInput.pan)){
            setError(prevState => ({...prevState, pan: true, message: "PAN number is invalid!"}));
            setDisabled(prevState => ({...prevState, register: false}));;
        }else if (!validateAadhar(formInput.aadhar)){
            setError(prevState => ({...prevState, aadhar: true, message: "Aadhar number invalid!"}));
            setDisabled(prevState => ({...prevState, register: false}));
        }else if (!validatePhone(formInput.phone)){
            setError(prevState => ({...prevState, phone: true, message: "Phone number is invalid!"}));
            setDisabled(prevState => ({...prevState, register: false}));
        }else if (!validatePassword(formInput.password)){
            setError(prevState => ({...prevState, password: true, message: "Password should contain atleast 8 characters and must contain one uppercase, one lowercase, one digit and one special character!"}));
            setDisabled(prevState => ({...prevState, register: false}));
        }else if (formInput.password !== formInput.confirmPassword){
            setError(prevState => ({...prevState, confirmPassword: true, message: "Confirm Password should be same as Password!"}));
            setDisabled(prevState => ({...prevState, register: false}));
        }else {
            PostRequest(process.env.REACT_APP_API_URL + 'user/register',{
                referredBy: formInput.referredBy,
                email: formInput.email,
                phone: formInput.phone,
                stdCode: formInput.stdCode,
                aadhar: formInput.aadhar,
                pan: formInput.pan
            }).then(response => {
                setFormInput(prevState => ({
                    ...prevState,
                    fullName: response.data.fullName,
                    state: response.data.state,
                    panStatus: response.data.panVerified,
                    aadharStatus: response.data.aadharVerified,
                    otp: response.data.otp
                }));
                setDisabled(prevState => ({ ...prevState, register: false }));
                setShowOtp(true);
            }).catch(err => {
                console.log(err)
                if (err.data.field === "pan") {
                    setError(prevState => ({ ...prevState, pan: true, message: (err.data.error || "Something went wrong!") }));
                } else if (err.data.field === "aadhar") {
                    setError(prevState => ({ ...prevState, aadhar: true, message: (err.data.error || "Something went wrong!") }));
                } else if (err.data.field === "email") {
                    setError(prevState => ({ ...prevState, email: true, message: (err.data.error || "Something went wrong!") }));
                } else if (err.data.field === "ref"){
                    setError(prevState => ({ ...prevState, ref: true, message: (err.data.error || "Something went wrong!") }));
                } else {
                    setError(prevState => ({ ...prevState, message: (err.data.error || "Something went wrong!") }));
                }
                setDisabled(prevState => ({ ...prevState, register: false }));
            })
        }
    }

    function otpVerification() {
        setDisabled(prevState => ({ ...prevState, otp: true }));
        setError(prevState => ({ ...prevState, message: "" }));
        if (!otp) {
            setError(prevState => ({ ...prevState, otp: true, message: "Field must not be empty!" }));
            setDisabled(prevState => ({ ...prevState, otp: false }));
        } else if (otp !== formInput.otp.toString()) {
            setError(prevState => ({ ...prevState, otp: true, message: 'Wrong OTP!' }));
            setDisabled(prevState => ({ ...prevState, otp: false }));
        } else {
            PostRequest(process.env.REACT_APP_API_URL + 'user/save', {
                fullName: formInput.fullName,
                referredBy: formInput.referredBy,
                email: formInput.email,
                phone: formInput.phone,
                aadharNumber: formInput.aadhar,
                panNumber: formInput.pan,
                password: formInput.password,
                stdCode: formInput.stdCode,
                state: formInput.state,
                panStatus: formInput.panStatus,
                aadharStatus: formInput.aadharStatus
            }).then(response => {
                setDisabled(prevState => ({ ...prevState, otp: false }));
                navigate("/");
            }).catch(err => {
                setDisabled(prevState => ({ ...prevState, otp: false }));
                setError(prevState => ({ ...prevState, message: (err.data || "Something went wrong!") }));
            });
        }
    }

    const handlePhoneInputChange = (e) => {
        const inputValue = e.target.value;
        const numericValue = inputValue.replace(/\D/g, ''); // Remove non-digit characters

        if (numericValue.length <= 10) {
            setFormInput((prevState) => ({ ...prevState, phone: numericValue }));
            setError((prevState) => ({ ...prevState, phone: false, message: '' }));
        }
    };

    const handleAadharInputChange = (e) => {
        const inputValue = e.target.value;
        const numericValue = inputValue.replace(/\D/g, ''); // Remove non-digit characters

        if (numericValue.length <= 12) {
            setFormInput((prevState) => ({ ...prevState, aadhar: numericValue }));
            setError((prevState) => ({ ...prevState, aadhar: false, message: '' }));
        }
    };

    return (
        <div className="bg-[#000] min-h-screen flex justify-center items-center bg-gradient-to-tr from-[#071D43] to-blue-50">
            {showOtp ? (
                <OTP
                    otp={otp}
                    error={error}
                    setError={setError}
                    setOtp={setOtp}
                    otpVerification={otpVerification}
                    disabled={disabled.otp}
                    fullName={formInput.fullName}
                    email={formInput.email}
                />
            ) : (
                <div className="relative max-w-[600px] py-[40px] px-[20px] md:p-[40px] my-[40px] mx-[15px] md:my-[40px] md:mx-auto rounded-[5px] z-9 bg-white w-full grid shadow-md">
                    {disabled.register && (<Loader />)}
                    <Link to="https://www.theabacus.in/" className="logo_icon text-center mx-auto mb-[10px] ">
                        <img className="h-[80px]" src={abacusLogo} alt="Logo" height="" width="" />
                    </Link>
                    <h1 className="text-center uppercase text-[24px] font-extrabold mb-[10px]">Register</h1>

                    <p className={`text-[14px] text-left text-[#FF0000] font-semibold mb-[5px] ${error.message ? 'block' : 'hidden '}`}>{error.message}</p>
                    <div className="mb-[10px]">
                        <Label
                            htmlFor="refId"
                            title="Referrence ID"
                        />
                        <TextInput
                            maxLength={8}
                            disabled={disabled.register}
                            className={error.referredBy && "border border-[#ff0000]"}
                            value={formInput.referredBy}
                            onChange={(e) => {
                                setFormInput(prevState => ({ ...prevState, referredBy: e.target.value }));
                                setError(prevState => ({ ...prevState, referredBy: false, message: "" }));
                            }}
                        />
                    </div>
                    <div className="mb-[10px]">
                        <Label
                            htmlFor="email"
                            title="Email"
                            important
                        />
                        <TextInput
                            type="email"
                            disabled={disabled.register}
                            value={formInput.email}
                            onChange={(e) => {
                                setFormInput(prevState => ({ ...prevState, email: e.target.value.replace(" ", "") }));
                                setError(prevState => ({ ...prevState, email: false, message: "" }));
                            }}
                            className={error.email && "border border-[#ff0000]"}
                        />
                    </div>
                    <Label
                        htmlFor="phone"
                        title="Phone"
                        important
                    />
                    <div className="flex gap-[5px] mb-[10px]">
                        <select 
                            disabled={disabled.register} 
                            className="h-[40px] lg:h-[45px] focus:outline-none hover:border-black border-[#c4c4c4] border focus:border-[#1E40AF] focus:shadow-[0_0_2px_#3c62e9] px-[5px] text-[14px]"  
                            value={formInput.stdCode} 
                            onChange={(e) => setFormInput(prevState => ({ ...prevState, stdCode: e.target.value }))
                        }>
                            {stdCodes.map((item, i) => (
                                <option key={i} value={item.dial_code} className="h-[20px] border-b">{item.dial_code} ({item.code})</option>
                            ))}
                        </select>
                        <TextInput
                            type="tel"
                            disabled={disabled.register}
                            className={error.phone && "border border-[#ff0000]"}
                            maxLength={10}
                            value={formInput.phone}
                            onChange={(e) => handlePhoneInputChange(e)}
                        />
                    </div>
                    <div className="mb-[10px]">
                        <Label
                            htmlFor="panCard"
                            title="PAN No."
                            important
                        />
                        <TextInput
                            disabled={disabled.register}
                            className={error.pan && "border border-[#ff0000]"}
                            maxLength={10}
                            value={formInput.pan}
                            onChange={(e) => {
                                setFormInput(prevState => ({ ...prevState, pan: e.target.value.toUpperCase() }));
                                setError(prevState => ({ ...prevState, pan: false, message: "" }));
                            }}
                        />
                    </div>
                    <div className="mb-[10px]">
                        <Label
                            htmlFor="aadhar"
                            title="Aadhar No."
                            important
                        />
                        <TextInput
                            disabled={disabled.register}
                            className={error.aadhar && "border border-[#ff0000]"}
                            maxLength={12}
                            value={formInput.aadhar}
                            onChange={(e) => handleAadharInputChange(e)}
                        />
                    </div>
                    <Label
                        htmlFor="password"
                        title="Password"
                        important
                    />
                    <div className="relative mb-[10px]">
                        <TextInput
                            type={showPass.pass ? "text" : "password"}
                            disabled={disabled.register}
                            className={error.password && "border border-[#ff0000]"}
                            value={formInput.password}
                            onChange={(e) => {
                                setFormInput(prevState => ({ ...prevState, password: e.target.value }));
                                setError(prevState => ({ ...prevState, password: false, message: "" }));
                            }}
                        />
                        <IconButton
                            icon={showPass.pass ? <FaRegEyeSlash size={15} /> : <FaRegEye size={15} />}
                            onClick={() => setShowPass(prevState => ({ ...prevState, pass: !showPass.pass }))}
                            className="absolute right-[5px] inset-y-0 lg:inset-y-[3px]"
                        />
                    </div>
                    <Label
                        htmlFor="confirmPassword"
                        title="Confirm Password"
                        important
                    />
                    <div className="relative">
                        <TextInput
                            type={showPass.confirmPass ? "text" : "password"}
                            disabled={disabled.register}
                            className={error.confirmPassword && "border border-[#ff0000]"}
                            value={formInput.confirmPassword}
                            onChange={(e) => {
                                setFormInput(prevState => ({ ...prevState, confirmPassword: e.target.value }));
                                setError(prevState => ({ ...prevState, confirmPassword: false, message: "" }));
                            }}
                        />
                        <IconButton
                            icon={showPass.confirmPass ? <FaRegEyeSlash size={15} /> : <FaRegEye size={15} />}
                            onClick={() => setShowPass(prevState => ({ ...prevState, confirmPass: !showPass.confirmPass }))}
                            className="absolute right-[5px] inset-y-0 lg:inset-y-[3px]"
                        />
                    </div>
                    <ActionButton
                        title={disabled.register ? "Registering..." : "Register"}
                        onClick={validationHandler}
                        disabled={disabled.register}
                        className="mt-[30px]"
                    />
                    <p className="text-[16px] text-center mt-[15px] mb-0">Already have an  account? <Link to="/" className="font-medium text-[#0e57d5] hover:underline">Login</Link></p>
                </div>
            )}
        </div>
    )
}

export default Register;