import React, { useState } from 'react';
import stdCodes from "../../data/stdCodes.json";
import { checkEmptyFields, validateAadhar, validateEmail, validatePan, validatePassword, validatePhone } from '../../utils/formFunctions';
import { PostRequest } from '../../utils/requests';
import Loader from '../shared/loader';
import { MdAdd, MdClose } from 'react-icons/md';
import IconButton from '../custom/iconButton';
import Label from '../custom/label';
import ActionButton from '../custom/actionButton';
import TextInput from '../custom/textInput';
import Modal from '.';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const AddUserPopup = ({setTrigger=()=>{}}) => {
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ disabled, setDisabled ] = useState(false);
    const [ formInput, setFormInput ] = useState({
        email: "",
        phone: "",
        pan: "",
        aadhar: "",
        password: "",
        confirmPassword: "",
        fullName: "",
        stdCode: "+91"
    })
    const [error, setError] = useState({
        email: false,
        phone: false,
        pan: false,
        aadhar: false,
        password: false,
        confirmPassword: false,
        message: ""
    });
    const [showPass, setShowPass] = useState({
        pass: false,
        confirmPass: false
    })
    const handlePhoneInputChange = (e) => {
        const inputValue = e.target.value;
        const numericValue = inputValue.replace(/\D/g, '');
    
        if (numericValue.length <= 10) {
            setFormInput((prevState) => ({ ...prevState, phone: numericValue }));
            setError((prevState) => ({ ...prevState, phone: false, message: '' }));
        }
    };

    const handleAadharInputChange = (e) => {
        const inputValue = e.target.value;
        const numericValue = inputValue.replace(/\D/g, '');
    
        if (numericValue.length <= 12) {
            setFormInput((prevState) => ({ ...prevState, aadhar: numericValue }));
            setError((prevState) => ({ ...prevState, aadhar: false, message: '' }));
        }
    };

    function registerationHandler(){
        setDisabled(true);
        setError(prevState => ({...prevState, message: ""}));
        if (checkEmptyFields(formInput)) {
            setError(prevState => ({...prevState, message: "Fields must not be empty!"}));
            setDisabled(false);
        }else if (!validateEmail(formInput.email)){
            setError(prevState => ({...prevState, email: true, message: "Email is invalid!"}));
            setDisabled(false);
        }else if (!validatePan(formInput.pan)){
            setError(prevState => ({...prevState, pan: true, message: "PAN number is invalid!"}));
            setDisabled(false);
        }else if (!validateAadhar(formInput.aadhar)){
            setError(prevState => ({...prevState, aadhar: true, message: "Aadhar number invalid!"}));
            setDisabled(false);
        }else if (!validatePhone(formInput.phone)){
            setError(prevState => ({...prevState, phone: true, message: "Phone number is invalid!"}));
            setDisabled(false);
        }else if (!validatePassword(formInput.password)){
            setError(prevState => ({...prevState, password: true, message: "Password should contain atleast 8 characters and must contain one uppercase, one lowercase, one digit and one special character!"}));
            setDisabled(false);
        }else if (formInput.password !== formInput.confirmPassword){
            setError(prevState => ({...prevState, confirmPassword: true, message: "Confirm Password should be same as Password!"}));
            setDisabled(false);
        }else {
            PostRequest(process.env.REACT_APP_API_URL + 'user/add',{
                email: formInput.email,
                emailVerified: true,
                phone: formInput.phone,
                stdCode: formInput.stdCode,
                phoneVerified: true,
                aadharNumber: formInput.aadhar,
                panNumber: formInput.pan,
                password: formInput.password,
                fullAddress: formInput.fullAddress,
                country: formInput.country,
                state: formInput.state
            }).then(response => {
                setTrigger(prev => prev + 1);
                setModalOpen(false);
                setDisabled(false);
                resetHandler()
            }).catch(err => {
                if (err.data.field === "pan"){
                    setError(prevState => ({...prevState, pan:true, message: (err.data.error || "Something went wrong!")}));
                }else if (err.data.field === "aadhar"){
                    setError(prevState => ({...prevState, aadhar:true, message: (err.data.error || "Something went wrong!")}));
                }else if (err.data.field === "email"){
                    setError(prevState => ({...prevState, email:true, message: (err.data.error || "Something went wrong!")}));
                }else{
                    setError(prevState => ({...prevState, message: (err.data.error || "Something went wrong!")}));
                }
                setDisabled(false);
            })
        }
    }
    function resetHandler(){
        setFormInput({
            email: "",
            phone: "",
            pan: "",
            aadhar: "",
            password: "",
            confirmPassword: "",
            fullName: "",
            stdCode: "+91",
            state: "",
            country: ""
        })
    }

    return (
        <>
            <IconButton
                title='Add'
                icon={<MdAdd size={20} />}
                onClick={() => setModalOpen(true)}
                className='bg-[#21407E] text-white hover:text-[#21407E] px-[10px] w-full'
            />
            <Modal open={modalOpen} close={() => setModalOpen(false)}>
                {disabled && (<Loader />)}
                <div className='text-center text-[24px] font-bold flex justify-between items-center bg-[#10203f] px-[30px] py-[10px]'>
                    <h4 className='text-white'>Customer Registeration</h4>
                    <IconButton 
                        icon={<MdClose size={20} color='#fff' />}
                        onClick={() => {
                            setModalOpen(false);
                            resetHandler();
                        }}
                        className='!p-0'
                    />
                </div>
                <div className='w-[100%] max-w-[700px] mx-auto px-[30px] py-[10px]'>
                    <p className={`text-[14px] text-left text-[#FF0000] font-semibold mb-[5px] ${error.message ? 'block' : 'hidden'}`}>{error.message}</p>
                    <div className='grid gap-[5px]'>
                        <div>
                            <Label title='Full Name' />
                            <TextInput
                                value={formInput.fullName} 
                                disabled={disabled}
                                onChange={(e) => {
                                    setFormInput(prevState => ({ ...prevState, fullName: e.target.value }));
                                    setError(prevState => ({...prevState, fullName: false, message: "" }));
                                }}
                            />
                        </div>
                        <div>
                            <Label htmlFor='Email' title='Email' important />
                            <TextInput 
                                value={formInput.email}
                                disabled={disabled}
                                className={error.email && "border-[#ff0000]"}
                                onChange={(e) => {
                                    setFormInput(prevState => ({ ...prevState, email: e.target.value }));
                                    setError(prevState => ({...prevState, email: false, message: "" }));
                                }}
                            />
                        </div>
                        <div className='grid grid-cols-2 gap-[10px]'>
                            <div>
                                <Label htmlFor='password' title='Password' important />
                                <div className="relative">
                                    <TextInput
                                        type={showPass.pass ? "text" : "password"}
                                        disabled={disabled}
                                        value={formInput.password}
                                        maxLength={12}
                                        className={error.password && "border-[#ff0000]"}
                                        onChange={(e) => {
                                            setFormInput(prevState => ({ ...prevState, password: e.target.value }));
                                            setError(prevState => ({...prevState, password: false, message: "" }));
                                        }}
                                    />
                                    <IconButton 
                                        icon={showPass.pass ? <FaRegEyeSlash size={15} /> : <FaRegEye size={15} />}
                                        onClick={() => setShowPass(prevState => ({ ...prevState, pass: !showPass.pass }))}
                                        className="absolute right-[5px] inset-y-[2px]"
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor='confirmPassword' title='Confirm Password' important />
                                <div className="relative">
                                    <TextInput
                                        type={showPass.confirmPass ? "text" : "password"}
                                        disabled={disabled}
                                        maxLength={12}
                                        value={formInput.confirmPassword}
                                        className={error.confirmPassword && "border-[#ff0000]"}
                                        onChange={(e) => {
                                            setFormInput(prevState => ({ ...prevState, confirmPassword: e.target.value }));
                                            setError(prevState => ({...prevState, confirmPassword: false, message: "" }));
                                        }}
                                    />
                                    <IconButton 
                                        icon={showPass.confirmPass ? <FaRegEyeSlash size={15} /> : <FaRegEye size={15} />}
                                        onClick={() => setShowPass(prevState => ({ ...prevState, confirmPass: !showPass.confirmPass }))}
                                        className="absolute right-[5px] inset-y-[2px]"
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor='Phone' title='Phone' />
                            <div className='flex gap-[5px]'>
                                <select
                                    className='w-[100px] border text-[14px] focus:outline-none hover:border-black border-[#c4c4c4] border focus:border-[#1E40AF] focus:shadow-[0_0_2px_#3c62e9]'   
                                    value={formInput.stdCode}
                                    onChange={(e) => setFormInput(prevState => ({ ...prevState, stdCode: e.target.value }))}
                                >
                                    {stdCodes.map((item, i) => (
                                        <option key={i} value={item.dial_code} className='text-[14px]'>{item.dial_code} ({item.code})</option>
                                    ))}
                                </select>
                                <TextInput 
                                    value={formInput?.phone}
                                    disabled={disabled}
                                    className={error.phone && "border-[#ff0000]"}
                                    onChange={(e) => handlePhoneInputChange(e)}
                                />
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-[10px]'>
                            <div>
                                <Label title='PAN' important />
                                <TextInput
                                    value={formInput.pan}
                                    disabled={disabled}
                                    maxLength={10}
                                    onChange={(e) => {
                                        setFormInput(prevState => ({ ...prevState, pan: e.target.value.toUpperCase() }));
                                        setError(prevState => ({...prevState, pan: false, message: "" }));
                                    }}
                                    className={error.pan && "border-[#ff0000]"}
                                />
                            </div>
                            <div>
                                <Label title='Aadhar No.' important />
                                <TextInput
                                    disabled={disabled}
                                    error={error.aadhar}
                                    maxLength={12}
                                    value={formInput.aadhar}
                                    onChange={(e) => handleAadharInputChange(e)}
                                    className={error.aadhar && "border-[#ff0000]"}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-[10px] mt-[30px] mb-[20px]'>
                        <ActionButton
                            onClick={resetHandler}
                            title='Reset'
                            className='w-[40%]'
                            variant="secondary"
                        />
                        <ActionButton 
                            disabled={disabled}
                            title="Register"
                            onClick={registerationHandler}
                            className='w-[60%]'
                            variant="primary"
                        />
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default AddUserPopup;