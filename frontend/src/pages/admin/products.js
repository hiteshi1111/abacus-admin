import React, { useEffect, useState } from "react";
import { GetRequest } from "../../utils/requests";
import Statistics from "../../components/dashboard/statistics";
import AddPlanPopup from "../../components/modal/addPlanPopup";
import Layout from "../../layout";

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [trigger, setTrigger] = useState(0);

    useEffect(() => {
        GetRequest(process.env.REACT_APP_API_URL + 'product').then(response => {
            setProducts(response.data);
        }).catch(err => {
            console.log(err);
        });
    },[trigger])
    return (
        <Layout>
            <AddPlanPopup setTrigger={setTrigger} />
            <div className='h-[80vh]'>
                <div className='flex justify-between items-center border-b py-[10px]'>
                    <h2 className="capitalize text-[25px] leading-[92.857%] font-bold text-[#21407E] w-full px-[30px]">All Plans</h2>
                    {/* <div className='flex justify-between items-center gap-[10px]' >
                        <Search
                            value={searchKey}
                            onChange={(e) => setSearchKey(e.target.value)}
                        />
                        <div className='flex gap-[10px]'>
                            {selectedRows.length > 0 && (
                                <DeletePopup 
                                    title="Are you sure that you want to deactivate the selected users?"
                                    subTitle="He/She will not be able to log in. You may reactivate the customers one by one."
                                    action={multipleDeleteHandler} 
                                />
                            )}
                            <AddUserPopup setTrigger={setTrigger}/>
                        </div>
                    </div> */}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[10px] mt-[20px] max-w-[1500px] mx-auto">
                    {products.length > 0 && products.map((product, index) => (
                        <Statistics
                            key={index}
                            currentPlan={product.productTitle}
                            price={product.productPrice}
                            startingDate="3 Nov, 2023"
                            endingDate="3 Nov, 2033"
                            rentalAmount={product.rentalAmount}
                            noOfBlocks={product.noOfBlocks}
                            timePeriod={product.rentalDuration}
                            productId={product._id}
                            setTrigger={setTrigger}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default AdminProducts;