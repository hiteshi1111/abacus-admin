import React, { useState } from 'react';
import { GetRequest, PostRequest } from '../../utils/requests';
import IconButton from '../custom/iconButton';
import { MdClose } from 'react-icons/md';
import { FaEye } from 'react-icons/fa';
import Modal from '.';
import Loader from '../shared/loader';
import ActionButton from '../custom/actionButton';
import TextInput from '../custom/textInput';
import Label from '../custom/label';
import stdCodes from "../../data/stdCodes.json";

const ViewPopup = ({userData, setTrigger}) => {
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ disabled, setDisabled ] = useState(false);
    const [updateInput, setUpdateInput] = useState({
        fullName: userData?.fullName || "",
        fullAddress: userData?.fullAddress || "",
        state: userData?.state || "",
        country: userData?.country || "",
        email: userData?.email || "",
        phone: userData?.phone || "",
        pan: userData?.panNumber || "",
        aadhar: userData?.aadharNumber || "",
        stdCode: userData?.stdCode || ""
    });
    const [error, setError] = useState({
        email: false,
        phone: false,
        pan: false,
        aadhar: false,
        password: false,
        confirmPassword: false,
        message: ""
    });

    const handlePhoneInputChange = (e) => {
        const inputValue = e.target.value;
        const numericValue = inputValue.replace(/\D/g, '');
    
        if (numericValue.length <= 10) {
            setUpdateInput((prevState) => ({ ...prevState, phone: numericValue }));
            setError((prevState) => ({ ...prevState, phone: false, message: '' }));
        }
    };

    const handleAadharInputChange = (e) => {
        const inputValue = e.target.value;
        const numericValue = inputValue.replace(/\D/g, '');
    
        if (numericValue.length <= 12) {
            setUpdateInput((prevState) => ({ ...prevState, aadhar: numericValue }));
            setError((prevState) => ({ ...prevState, aadhar: false, message: '' }));
        }
    };
    function deactivationHandler(){
        GetRequest(process.env.REACT_APP_API_URL + 'user/deactivate/' + userData?._id).then(response => {
            setTrigger(prev => prev + 1);
            setModalOpen(false);
            setDisabled(false);
        }).catch(err => {
            console.log(err.data);
            setDisabled(false);
        });
    }
    function reactivationHandler(){
        GetRequest(process.env.REACT_APP_API_URL + 'user/reactivate/' + userData?._id).then(response => {
            setTrigger(prev => prev + 1);
            setModalOpen(false);
            setDisabled(false);
        }).catch(err => {
            console.log(err.data);
            setDisabled(false);
        });
    }
    function updateUserHandler(){
        const updatedData = {};
        if (updateInput.fullName) {
            updatedData.fullName = updateInput.fullName;
        }
        if (updateInput.fullAddress) {
            updatedData.fullAddress = updateInput.fullAddress;
        }
        if (updateInput.state) {
            updatedData.state = updateInput.state;
        }
        if (updateInput.country) {
            updatedData.country = updateInput.country;
        }
        PostRequest(process.env.REACT_APP_API_URL + 'user/update/'+ userData?._id, updatedData).then(response => {
            setTrigger(prev => prev + 1);
            setModalOpen(false);
            setDisabled(false);
        }).catch(err => {
            console.log("error >", err);
            setDisabled(false);
        });
    }

    return (
        <>
            <IconButton 
                icon={<FaEye size={15} />}
                className='!bg-[#dcdcdc] !mr-[10px] !h-[35px] !w-[35px] !min-w-[35px]' 
                onClick={() => setModalOpen(true)}
            />
            <Modal open={modalOpen} close={() => setModalOpen(false)}>
                {disabled && (<Loader />)}
                <div className='text-center text-[24px] font-bold flex justify-between items-center bg-[#10203f] px-[30px] py-[10px]'>
                    <h4 className='text-white'>Update Customer</h4>
                    <IconButton
                        icon={<MdClose size={20} color='#fff' />}
                        onClick={() => {
                            setModalOpen(false);
                            // resetHandler();
                        }}
                        className='!p-0'
                    />
                </div>
                <div className='w-[100%] max-w-[700px] mx-auto px-[30px] py-[10px]'>
                    <p className={`text-[14px] text-left text-[#FF0000] font-semibold mb-[5px] ${error.message ? 'block' : 'hidden'}`}>{error.message}</p>
                    <div className='grid gap-[5px]'>
                        <div className='grid grid-cols-2 gap-[10px]'>
                            <div>
                                <Label title='Full Name' />
                                <TextInput
                                    value={updateInput.fullName} 
                                    disabled={disabled}
                                    onChange={(e) => {
                                        setUpdateInput(prevState => ({ ...prevState, fullName: e.target.value }));
                                        setError(prevState => ({...prevState, fullName: false, message: "" }));
                                    }}
                                />
                            </div>
                            <div>
                                <Label htmlFor='Email' title='Email' important />
                                <TextInput 
                                    value={updateInput.email}
                                    disabled={disabled}
                                    className={error.email && "border-[#ff0000]"}
                                    onChange={(e) => {
                                        setUpdateInput(prevState => ({ ...prevState, email: e.target.value }));
                                        setError(prevState => ({...prevState, email: false, message: "" }));
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor='Phone' title='Phone' />
                            <div className='flex gap-[5px]'>
                                <select
                                    className='w-[100px] text-[14px] focus:outline-none hover:border-black border-[#c4c4c4] border focus:border-[#1E40AF] focus:shadow-[0_0_2px_#3c62e9]'   
                                    value={updateInput.stdCode}
                                    onChange={(e) => setUpdateInput(prevState => ({ ...prevState, stdCode: e.target.value }))}
                                >
                                    {stdCodes.map((item, i) => (
                                        <option key={i} value={item.dial_code}>{item.dial_code} ({item.code})</option>
                                    ))}
                                </select>
                                <TextInput 
                                    value={updateInput.phone}
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
                                    value={updateInput.pan}
                                    disabled={disabled}
                                    maxLength={10}
                                    onChange={(e) => {
                                        setUpdateInput(prevState => ({ ...prevState, pan: e.target.value.toUpperCase() }));
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
                                    value={updateInput.aadhar}
                                    onChange={(e) => handleAadharInputChange(e)}
                                    className={error.aadhar && "border-[#ff0000]"}
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor='fullAddress' title='Full Address' />
                            <TextInput 
                                value={updateInput.fullAddress}
                                disabled={disabled}
                                onChange={(e) => {
                                    setUpdateInput(prevState => ({ ...prevState, fullAddress: e.target.value }));
                                    setError(prevState => ({...prevState, message: "" }));
                                }}
                            />
                        </div>
                        <div className='grid grid-cols-2 gap-[10px]'>
                            <div>
                                <Label title='State' important />
                                <TextInput
                                    value={updateInput.state}
                                    disabled={disabled}
                                    maxLength={10}
                                    onChange={(e) => {
                                        setUpdateInput(prevState => ({ ...prevState, state: e.target.value.toUpperCase() }));
                                        setError(prevState => ({...prevState, message: "" }));
                                    }}
                                />
                            </div>
                            <div>
                                <Label title='Country' />
                                <TextInput
                                    disabled={disabled}
                                    maxLength={12}
                                    value={updateInput.country}
                                    onChange={(e) => {
                                        setUpdateInput(prevState => ({ ...prevState, country: e.target.value.toUpperCase() }));
                                        setError(prevState => ({...prevState, message: "" }));
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-[10px] mt-[30px] mb-[20px]'>
                        <ActionButton
                            onClick={userData?.active ? deactivationHandler : reactivationHandler}
                            title={userData?.active ? "Deactivate" : "Reactivate"}
                            className={`w-[40%] ${userData?.active ? "bg-[#ff0000]" : "bg-[#228B22]"}`}
                            variant="primary"
                        />
                        <ActionButton
                            disabled={disabled}
                            title="Update"
                            onClick={updateUserHandler}
                            className='w-[60%]'
                            variant="primary"
                        />
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ViewPopup;