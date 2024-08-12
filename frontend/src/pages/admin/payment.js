import React, { useEffect, useState } from 'react'
import Layout from '../../layout'
import { GetRequest } from '../../utils/requests';
import { Link } from 'react-router-dom';

const Payment = () => {
    const [plans, setPlans] = useState([])

    useEffect(() => {
            GetRequest(process.env.REACT_APP_API_URL + 'plan/').then(response => {
                console.log(response.data, "response")
                setPlans(response.data);
            }).catch(err => {
                console.log(err.data);
            });
    }, []);

  return (
    <Layout>
        <div className='h-[80vh]'>
            <div className='flex justify-between items-center border-b py-[10px]'>
                <h2 className="capitalize text-[25px] leading-[92.857%] font-bold text-[#21407E] w-full px-[30px]">Payment</h2>
            </div>    
            <div className='grid gap-4'>
                {
                    plans.map((user, i) => (
                        <div key={i} className="flex justify-between">
                            <div>{user.userId}</div>
                            <div>
                                {
                                    user.plans.map((plan, i) => (
                                    <div key={i} className='flex justify-between'>
                                        <div>{plan.userId.fullName}</div>
                                        <div>{plan.userId.email}</div>
                                        <div>{plan.productId.productTitle}</div>
                                        <div>{plan.productId.productPrice}</div>
                                    </div>
                                    ))
                                }
                            </div>
                            <Link className="bg-blue-500 text-white font-bold p-2">
                                Add
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    </Layout>
  )
}

export default Payment