import React, { useContext, useEffect, useState } from "react";
import { AccountContext } from "../../App";
import Layout from "../../layout";
import { CopyToClipboard } from "../../utils/copyToClipboard";
import ActionButton from "../../components/custom/actionButton";
import TextInput from "../../components/custom/textInput";
import { GetRequest } from "../../utils/requests";
import { PiSmileyXEyes } from "react-icons/pi";
import { money } from "../../utils/money";

const Referral = () => {
    const { userData } = useContext(AccountContext);
    const [ referrals, setReferrals ] = useState([]);
    useEffect(() => {
        if (userData){
            GetRequest(process.env.REACT_APP_API_URL + 'referral/' + userData.userId).then(response => {
                setReferrals(response.data);
            }).catch(err => {
                console.log(err.data);
            });
        }
    },[userData]);
    
    return (
        <Layout>
            <div className='flex justify-between items-center border-b py-[10px] mb-[30px]'>
                <h2 className="capitalize text-[25px] leading-[92.857%] font-bold text-[#21407E] w-full px-[30px]">Referrals</h2>
            </div>
            <div className="p-[30px] w-full !bg-[#e0ffff] grid gap-[30px] max-w-[700px] mx-auto">
                <h5>My Referral</h5>
                <div className="flex gap-[10px]">
                    <TextInput
                        value={`https://admin-abacus.netlify.app/register?ref=${userData?.myReferral}`} 
                        disabled 
                    />
                    <ActionButton 
                        variant="primary" 
                        title="Copy"
                        onClick={() => CopyToClipboard(`https://admin-abacus.netlify.app/register?ref=${userData?.myReferral}`)}
                        className="w-full max-w-[150px]"
                    >Copy</ActionButton>
                </div>
            </div>
            <div className='flex justify-between items-center border-b py-[10px] my-[30px]'>
                <h2 className="capitalize text-[25px] leading-[92.857%] font-bold text-[#21407E] w-full px-[30px]">My Referrals</h2>
            </div>
            {referrals.length > 0 ? (
                <table className="w-full max-w-[1000px] mx-auto">
                    <thead className="bg-[#aaa] ">
                        <tr>
                            <td className='px-[20px] text-[14px] 2xl:text-[16px]'>Level</td>
                            <td className='px-[20px] text-[14px] 2xl:text-[16px]'>Users</td>
                            <td className='px-[20px] text-[14px] 2xl:text-[16px]'>Added On</td>
                            <td className='px-[20px] text-[14px] 2xl:text-[16px] text-right'>Earned</td>
                        </tr>
                    </thead>
                    <tbody>
                        {referrals.map((item, i) => (
                            <tr key={i}>
                                <td className="px-[20px]">
                                    <span className="text-[14px] 2xl:text-[16px]">{item.level}</span>  
                                </td>
                                <td>
                                    {item.users.length>0 && item.users.map((user, i) => (
                                        <div key={i} className="grid px-[20px]">
                                            <span className="text-[14px] 2xl:text-[16px]">{user.userId.fullName}</span>
                                        </div>
                                    ))}    
                                </td>
                                <td>
                                    {item.users.length>0 && item.users.map((user, i) => (
                                        <div key={i} className="grid px-[20px]">
                                            <span className="text-[14px] 2xl:text-[16px]">{user.userId.createdAt.split("T")[0]}</span>
                                        </div>
                                    ))}   
                                </td>
                                <td className="px-[20px] grid text-right">
                                    {item.users.length>0 && item.users.map(() => (
                                        <span className="text-[14px] 2xl:text-[16px]">{money(100)}</span>  
                                    ))}   
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ):(
                <>
                <p className="text-[18px] flex justify-center items-center"> 
                    <PiSmileyXEyes size={40} className="mr-[10px]"/> No Referrals
                </p>
                <p className="text-[16px] flex justify-center items-center text-center mt-[10px]"> 
                    Copy above link, share it with your groups and start earning.
                </p>
                </>
            )}
        </Layout>
    )
}

// const myReferrals = [
//     {
//         level: 1,
//         users: [
//             {
//                 name: "hiteshi",
//             },
//             {
//                 name: "prakrity"
//             }
//         ]
//     },
//     {
//         level: 2,
//         users: [
//             {
//                 name: "hiteshi"
//             },
//             {
//                 name: "prakrity"
//             },
//             {
//                 name: "barry"
//             }
//         ]
//     },
// ]

export default Referral;