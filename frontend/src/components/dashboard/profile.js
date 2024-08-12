import React, { useContext } from 'react'
import { AccountContext } from '../../App';

const Profile = () => {
    const { userData } = useContext(AccountContext);
    return (
        <div className='p-[30px] w-full !bg-[#e0ffff] mt-[30px]'>
            <h5>My Info</h5>
            <div className='mt-[20px] grid md:grid-cols-3 grid-cols-1 gap-y-[20px]'>
                <div>
                    <div className='text-[14px] 2xl:text-[16px]'>Full Name: {userData?.fullName || "---"}</div>
                    <div className='text-[14px] 2xl:text-[16px]'>Email: {userData?.email}</div>
                    {/* <div className='text-[14px] 2xl:text-[16px] capitalize'>Role: {userData?.role}</div> */}
                </div>
                <div>
                    <div className='text-[14px] 2xl:text-[16px]'>My Referral ID: {userData?.myReferral || "---"}</div>
                    <div className='text-[14px] 2xl:text-[16px]'>PAN: {userData?.panNumber || "---"}</div>
                    <div className='text-[14px] 2xl:text-[16px]'>Aadhar: {userData?.aadharNumber || "---"}</div>
                </div>
                <div>
                    <div className='text-[14px] 2xl:text-[16px]'>Address: {userData?.fullAddress || "---"}</div>
                    <div className='text-[14px] 2xl:text-[16px]'>State: {userData?.state || "---"}</div>
                </div>
            </div>
        </div>
    )
}

export default Profile;