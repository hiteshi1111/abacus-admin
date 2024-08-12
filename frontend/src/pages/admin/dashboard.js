import React from 'react'
import Profile from '../../components/dashboard/profile';
import Layout from '../../layout';
import Earnings from '../../components/dashboard/earnings';

const AdminDashboard = () => {
    return (
        <Layout>
            <div className='flex justify-between items-center border-b py-[10px]'>
                <h2 className="capitalize text-[25px] leading-[92.857%] font-bold text-[#21407E] w-full px-[30px]">Welcome</h2>
            </div>
            <Profile />
            <Earnings 
                currentYearEarning={24344}
                totalEarning={234234324}
                admin
            />
        </Layout>
    )
}

export default AdminDashboard;