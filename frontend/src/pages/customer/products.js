import React, { useEffect, useState } from "react";
import { GetRequest } from "../../utils/requests";
import Statistics from "../../components/dashboard/statistics";
import Layout from "../../layout";

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        GetRequest(process.env.REACT_APP_API_URL + 'product').then(response => {
            setProducts(response.data);
        }).catch(err => {
            console.log(err);
        });
    },[])
    
    return (
        <Layout>
            <div className='flex justify-between items-center border-b py-[10px] mb-[30px]'>
                <h2 className="capitalize text-[25px] leading-[92.857%] font-bold text-[#21407E] w-full px-[30px]">All Plans</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] 2xl:gap-[30px] max-w-[1500px] mx-auto px-[10px] 2xl:px-[30px]">
                {products.length > 0 && products.map((product, index) => (
                    <Statistics
                        currentPlan={product.productTitle}
                        price={product.productPrice}
                        startingDate="3 Nov, 2023"
                        endingDate="3 Nov, 2033"   
                        rentalAmount={product.rentalAmount}
                        noOfBlocks={product.noOfBlocks}
                        timePeriod={product.rentalDuration}
                        productId={product._id}
                    />
                ))}
            </div>
        </Layout>
    )
}

export default Products;