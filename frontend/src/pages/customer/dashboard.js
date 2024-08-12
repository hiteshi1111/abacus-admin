import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../layout';
import { AccountContext } from '../../App';
import Profile from '../../components/dashboard/profile';
import Statistics from '../../components/dashboard/statistics';
import Earnings from '../../components/dashboard/earnings';
import { GetRequest } from '../../utils/requests';

const Dashboard = () => {
    const [userPlans, setUserPlans] = useState([])
    const { userData } = useContext(AccountContext);

    useEffect(() => {
        if (userData){
            GetRequest(process.env.REACT_APP_API_URL + 'plan/' + userData?.userId).then(response => {
                setUserPlans(response.data);
            }).catch(err => {
                console.log(err);
            });
        }
        // eslint-disable-next-line
    },[])

    const formatCreatedAt = (date) => {
        const options = {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        //   hour: '2-digit',
        //   minute: '2-digit',
        //   hour12: true,
        };
        const dateTimeFormat = new Intl.DateTimeFormat('en-US', options);
        return dateTimeFormat.format(new Date(date));
    };
    return (
        <Layout>
            <div className='flex justify-between items-center border-b py-[10px] mb-[30px]'>
                <h2 className="capitalize text-[25px] leading-[92.857%] font-bold text-[#21407E] w-full px-[30px]">Welcome {userData?.fullName}</h2>
            </div>
            <div className='max-w-[1500px] mx-auto px-[10px] 2xl:px-[30px]'>
                <Profile />
                <div className='grid grid-cols-2 gap-[30px]'>
                {userPlans.length > 0 ? (
                    userPlans.map((plan) => (
                        <Statistics
                            key={plan._id} 
                            currentPlan={plan.productId.productTitle}
                            startingDate={formatCreatedAt(plan.createdAt)}
                            endingDate={formatCreatedAt(plan.finalDate)}
                            rentalAmount={plan.productId.rentalAmount}
                            noOfBlocks={plan.productId.noOfBlocks}
                            current 
                            price={plan.productId.productPrice}
                        />
                    ))
                ) : (
                    <div className={'group relative p-[10px] md:p-[20px] 2xl:p-[30px] w-full bg-[#fffacd] mt-[30px] '}>
                    <div className='right-[50px] top-[10px] p-[30px]'>
                        <h5>Current Plan: </h5>
                        <h5 className=''>No Plans</h5> 
                    </div>
                    </div>
                )}
                    <Earnings
                        currentYearEarning={1111}
                        totalEarning={11111111}
                    />
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard;