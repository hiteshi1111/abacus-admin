import React, { useContext, useEffect, useState } from 'react'
import Label from '../custom/label';
import TextInput from '../custom/textInput';
import ActionButton from '../custom/actionButton';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import IconButton from '../custom/iconButton';
import { checkEmptyFields, validatePassword } from '../../utils/formFunctions';
import { PutRequest } from '../../utils/requests';
import { useNavigate } from 'react-router';
import { AccountContext } from '../../App';

const PasswordUpdate = ({disabled=false, setDisabled=() => {}}) => {
    const navigate = useNavigate();
    const { userData, setUserData } = useContext(AccountContext);
    const [ formInput, setFormInput ] = useState({
        oldPass: "",
        newPass: "",
        confirmNewPass: "",
    })
    const [ error, setError ] = useState({
        oldPass: false,
        newPass: false,
        confirmNewPass: false,  
        message: ""
    })
    const [showPass, setShowPass] = useState({
        oldPass: false,
        newPass: false,
        confirmNewPass: false
    })
    const [ success, setSuccess ] = useState(false);

    function logoutHandler(){
        sessionStorage.removeItem("xios");
        setUserData(null);
        if (!userData){
            navigate("/")
        }
    }
    useEffect(() => {
        if (success){
            logoutHandler()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[success])

    function updateHandler(){
        setError(prevState => ({...prevState, message: ""}));
        if (checkEmptyFields(formInput)){
            setError(prevState => ({...prevState, message: "Fields must not be empty"}))
        }else if(!validatePassword(formInput.newPass)){
            setError(prevState => ({...prevState, newPass: true, message: "Password must contain 8 characters with atleast one uppercase, one digit and one special character"}))
        }else if (formInput.newPass !== formInput.confirmNewPass){
            setError(prevState => ({...prevState, confirmNewPass: true, message: "Confirm New Password should match the New Password"}))
        }else {
            PutRequest(process.env.REACT_APP_API_URL + 'password/'+ userData?.userId, formInput).then(response => {
                if (response.status !== 200){
                    setError(prevState => ({...prevState, oldPass: true, message: response.data}))
                }else{
                    setDisabled(false);
                    setSuccess(true)
                }
            }).catch(err => {
                console.log("error >", err);
                setDisabled(false);
            });
        }
    }
    return (
        <div className='mt-[30px] max-w-[500px] mx-auto'>
            <h5 className="capitalize font-bold text-[#21407E] w-full mb-[20px]">Password Settings</h5>
            <p className={`text-[14px] text-left text-[#008000] font-semibold ${success ? 'block' : 'hidden'}`}>Updated Successfully</p>
            <p className={`text-[14px] text-left text-[#FF0000] font-semibold ${error.message ? 'block' : 'hidden'}`}>{error.message}</p>
            <Label title='Old Password' />
            <div className="relative mb-[10px]">
                <TextInput
                    value={formInput.oldPass} 
                    type={showPass.oldPass ? "text" : "password"}
                    disabled={disabled}
                    placeholder='********'
                    className={error.oldPass && "border-[#ff0000]"}
                    onChange={(e) => {
                        setFormInput(prevState => ({ ...prevState, oldPass: e.target.value }));
                        setError(prevState => ({ ...prevState, oldPass: false, message: "" }));
                    }}
                />
                <IconButton
                    icon={showPass.oldPass ? <FaRegEyeSlash size={15} /> : <FaRegEye size={15} />}
                    onClick={() => setShowPass(prevState => ({ ...prevState, oldPass: !showPass.oldPass }))}
                    className="absolute right-[5px] inset-y-[3px]"
                />
            </div>

            <Label title='New Password' />
            <div className="relative mb-[10px]">
                <TextInput 
                    value={formInput.newPass} 
                    type={showPass.newPass ? "text" : "password"}
                    disabled={disabled}
                    placeholder='********'
                    className={error.newPass && "border-[#ff0000]"}
                    onChange={(e) => {
                        setFormInput(prevState => ({ ...prevState, newPass: e.target.value }));
                        setError(prevState => ({ ...prevState, newPass: false, message: "" }));
                    }}
                />
                <IconButton
                    icon={showPass.newPass ? <FaRegEyeSlash size={15} /> : <FaRegEye size={15} />}
                    onClick={() => setShowPass(prevState => ({ ...prevState, newPass: !showPass.newPass }))}
                    className="absolute right-[5px] inset-y-[3px]"
                />
            </div>

            <Label title='Confirm New Password' />
            <div className="relative">
                <TextInput 
                    value={formInput.confirmNewPass}
                    type={showPass.confirmNewPass ? "text" : "password"}
                    disabled={disabled}
                    placeholder='********'
                    className={error.confirmNewPass && "border-[#ff0000]"}
                    onChange={(e) => {
                        setFormInput(prevState => ({ ...prevState, confirmNewPass: e.target.value }));
                        setError(prevState => ({ ...prevState, confirmNewPass: false, message: "" }));
                    }} 
                />
                <IconButton
                    icon={showPass.confirmNewPass ? <FaRegEyeSlash size={15} /> : <FaRegEye size={15} />}
                    onClick={() => setShowPass(prevState => ({ ...prevState, confirmNewPass: !showPass.confirmNewPass }))}
                    className="absolute right-[5px] inset-y-[3px]"
                />
            </div>
            <ActionButton
                title='Update' 
                className='w-full mt-[30px]' 
                onClick={updateHandler}
            />
        </div>
    )
}

export default PasswordUpdate;