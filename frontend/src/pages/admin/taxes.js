import React, { useEffect, useState } from 'react';
import { checkEmptyFields } from '../../utils/formFunctions';
import Loader from '../../components/shared/loader';
import { GetRequest, PostRequest } from '../../utils/requests';
import convertDate from '../../utils/convertDate';
import DeletePopup from '../../components/modal/deletePopup';
import Layout from '../../layout';
import TextInput from '../../components/custom/textInput';
import ActionButton from '../../components/custom/actionButton';
import Label from '../../components/custom/label';
import Tooltip from '../../components/custom/tooltip';
import { FaCircle } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const Taxes = () => {
    const [trigger, setTrigger] = useState(0);
    const [taxList, setTaxList] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');
    const [formInput, setFormInput] = useState({
        title: "",
        taxPercentage: ""
    });

    useEffect(() => {
        GetRequest(process.env.REACT_APP_API_URL + 'tax').then(response => {
            setTaxList(response.data);
        }).catch(err => {
            console.log("error >", err)
        });
    },[trigger]);

    const handleTaxChange = (e) => {
        const inputValue = e.target.value;
        const numericValue = inputValue.replace(/\D/g, '');
        setFormInput((prevState) => ({ ...prevState, taxPercentage: numericValue }));
        setError("");
    };
    function resetHandler() {
        setFormInput({
            title: "",
            taxPercentage: ""
        })
    }
    function submitHandler(){
        setDisabled(true);
        if (checkEmptyFields(formInput)){
            setError("Fields must not be empty!");
            setDisabled(false);
        }else{
            PostRequest(process.env.REACT_APP_API_URL + 'tax', formInput).then(response => {
                setTrigger(prev => prev + 1);
                setDisabled(false);
                resetHandler();
            }).catch(err => {
                console.log("error >", err)
            });
        }
    }
    function deactivationHandler(id){
        GetRequest(process.env.REACT_APP_API_URL + 'tax/deactivate/'+ id).then(response => {
            setTrigger(prev => prev + 1);
        }).catch(err => {
            console.log("error >", err)
        });
    }
    return (
        <Layout>
            <div className='flex justify-between items-center border-b py-[10px]'>
                <h2 className="capitalize text-[25px] leading-[92.857%] font-bold text-[#21407E] w-full px-[30px]">Taxes</h2>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-[10px] 2xl:gap-[30px] mt-[20px]'>
                <div className='w-full'>
                    <table className='w-full'>
                        <thead>
                            <tr className='bg-[#dcdcdc]'>
                                {taxFields.map((col, i) => (
                                    <td key={i} className={`font-bold text-[14px] px-[10px] ${col.class}`}>{col.title}</td>
                                ))}
                                <td className='!font-bold !text-[14px]'></td>
                            </tr>
                        </thead>
                        <tbody>
                            {taxList.length > 0 && taxList.map((item, i) => (
                                <tr key={i} className={`!bg-[#f8f8ff]`}>
                                    <td className='px-[10px] text-[14px]'>{item.title || "----"}</td>
                                    <td className='px-[10px] text-[14px]'>{item.taxPercentage}%</td>
                                    <td className='px-[10px] text-[14px]'>{convertDate(item.createdAt)}</td>
                                    <td className='px-[10px] text-[14px]'>
                                        <Tooltip title={item.active ? "Active" : "InActive"} position="bottom">
                                            <FaCircle color={item.active ? "#008000" : "#ff0000"} className='mx-auto'/>
                                        </Tooltip>
                                    </td>
                                    <td className='px-[10px]'>
                                        <DeletePopup 
                                            title="Are you sure that you want to deactivate the selected users?"
                                            subTitle="You can reactivate the users one by one."
                                            action={() => deactivationHandler(item._id)} 
                                            className='bg-transparent'
                                            icon={<MdDelete size={18} color='#dc143c' />} 
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='max-w-[600px] w-full'>
                    <div className='bg-[#f2f3f4] p-[30px] relative'>
                        {disabled && <Loader />}
                        <h3 className="capitalize text-[20px] leading-[92.857%] font-bold text-[#21407E] w-full mb-[20px]">Add New Tax</h3>
                        <p className={`text-[14px] text-left text-[#FF0000] font-semibold ${error ? 'block' : 'hidden'}`}>{error}</p>
                        <div>
                            <Label title='Title' />
                            <TextInput
                                value={formInput.title} 
                                disabled={disabled}
                                onChange={(e) => {
                                    setFormInput(prevState => ({ ...prevState, title: e.target.value }));
                                    setError("");
                                }}
                            />
                        </div>
                        <div className='mt-[5px]'>
                            <Label title='Tax Percentage' />
                            <TextInput
                                value={formInput.taxPercentage} 
                                disabled={disabled}
                                onChange={(e) => handleTaxChange(e)}
                            />
                        </div>
                        <div className='grid grid-cols-2 gap-[10px] mt-[30px]'>
                            <ActionButton
                                variant="secondary"
                                onClick={resetHandler}
                                title='Reset'
                            />
                            <ActionButton 
                                variant="primary" 
                                onClick={submitHandler}
                                title='Add'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

const taxFields = [
    {
        title: "Name",
        class: "text-left"
    },
    {
        title: "Deduction (%)",
        class: "text-left"
    },
    {
        title: "Created At",
        class: "text-left"
    },
    {
        title: "Status",
        class: "text-center"
    }
]

export default Taxes;