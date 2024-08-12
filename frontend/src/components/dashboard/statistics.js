import React, { useContext, useState} from 'react';
import { AccountContext } from '../../App';
import EditPlanPopup from '../modal/editPlanPopup';
import { money } from '../../utils/money';
import { MdCurrencyRupee, MdDelete, MdStorage, MdWatchLater } from 'react-icons/md';
import DeletePopup from '../modal/deletePopup';
import PaymentPopup from '../modal/paymentPopup';
import { GetRequest, PutRequest } from '../../utils/requests';

const Statistics = ({currentPlan, startingDate, endingDate, rentalAmount, noOfBlocks, current=false, timePeriod, price, productId, setTrigger=()=>{}, key}) => {
    const { role, userData } = useContext(AccountContext);
    const [paymentSuccess, setPaymentSuccess] = useState(false)

    const easebuzzkey = process.env.REACT_APP_EASEBUZZ_KEY;
    const mode = process.env.REACT_APP_EASEBUZZ_MODE;
    function deleteHandler(){
        GetRequest(process.env.REACT_APP_API_URL + 'product/delete/'+ productId).then(response => {
            setTrigger(prev => prev+1)
        }).catch(err => {
            console.log("error >", err)
        });
    }
    function draftHandler(){
        PutRequest(process.env.REACT_APP_API_URL + 'plan/' + userData?.userId, {productId}).then(response => {
            initiatePaymentProcess(response.data.token, response.data.amount, response.data.planId)
        }).catch(err => {
            console.log("error >", err)
        })
    }

     const initiatePaymentProcess = (token, amount, planId) => {
         window.handlePaymentResponse = (response) => {
            const transactionId = response.txnid;
            const stat = response.status;
            if (stat === "success") {
                PutRequest(process.env.REACT_APP_API_URL + 'payment/paid/' + planId, {transactionId}).then(response => {
                setPaymentSuccess(true)
                }).catch(err => {
                    console.log(err)
                });
            } else {
                console.log("something went wrong")
            }
        };

        const script1 = document.createElement("script");
        script1.src = "https://ebz-static.s3.ap-south-1.amazonaws.com/easecheckout/v2.0.0/easebuzz-checkout-v2.min.js";
        script1.id = "easebuzz-checkout";
        script1.defer = true;
        script1.onload = () => {
            const script2 = document.createElement("script");
            script2.type = "text/javascript";
            script2.textContent = `
                var easebuzzCheckout = new EasebuzzCheckout('${easebuzzkey}', '${mode}');
                var options = {
                    access_key: '${token}',
                    onResponse: (response) => {
                        window.handlePaymentResponse(response);
                    },
                    theme: "#123456"
                };
                easebuzzCheckout.initiatePayment(options);
            `;
            document.head.appendChild(script2);
        };
        document.head.appendChild(script1);
    };

    return (  
        <div key={key} className={`group relative p-[10px] md:p-[20px] 2xl:p-[30px] w-full ${current ? "bg-[#fffacd] mt-[30px]" : "bg-[#00024414] hover:bg-[#e6f5ff] shadow-md"}`}>
            <div className='group-hover:block hidden absolute right-[10px] top-[10px]'>
                {role === "admin" && (
                    <div className='flex gap-[5px]'>
                        <EditPlanPopup 
                            currentPlan={currentPlan}
                            price={price}
                            startingDate="3 Nov, 2023"
                            endingDate="3 Nov, 2033"
                            rentalAmount={rentalAmount}
                            noOfBlocks={noOfBlocks}
                            timePeriod={timePeriod}
                            productId={productId}
                            setTrigger={setTrigger}
                        />
                        <DeletePopup  
                            title="Are you sure you want to delete the selected plan?"
                            subTitle="This action can not be undone!"
                            action={deleteHandler}
                            className='bg-transparent'
                            icon={<MdDelete size={18} color='#dc143c' />} 
                        />
                    </div>
                )}
            </div>
            {current && (<h5>Current Plan: {currentPlan}</h5>)}
            <div className='flex flex-col lg:flex-row items-center justify-between'>
                <div>
                    <div className='flex items-center gap-[10px] mt-[20px] mb-[10px]'>
                        <div className='h-[30px] min-w-[30px] flex justify-center items-center bg-[#f5f5f5] rounded-full'>
                            <MdStorage size={15} color='#FF0000'/>
                        </div>
                        <div className='grid 2xl:flex 2xl:items-center 2xl:gap-[5px]'>
                            <span className='font-bold text-[14px] 2xl:text-[16px]'>No. of Blocks: </span>
                            <span className='text-[14px]'>{noOfBlocks}</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-[10px] mb-[10px]'>
                        <div className='h-[30px] min-w-[30px] flex justify-center items-center bg-[#f5f5f5] rounded-full'>
                            <MdCurrencyRupee size={15} color='#000'/>
                        </div>
                        <div className='grid 2xl:flex 2xl:items-center 2xl:gap-[5px]'>
                            <span className='font-bold text-[14px] 2xl:text-[16px]'>Assured Rental: </span>
                            <span className='text-[14px]'>{money(rentalAmount)}</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-[10px]'>
                        <div className='h-[30px] min-w-[30px] flex justify-center items-center bg-[#f5f5f5] rounded-full'>
                            <MdWatchLater size={15} color='#008080'/>
                        </div>
                        <div className='grid 2xl:flex 2xl:items-center 2xl:gap-[5px]'>
                            <span className='font-bold text-[14px] 2xl:text-[16px]'>Time Period: </span>
                            <span className='text-[14px]'>{current ? `${startingDate} - ${endingDate}` : `${timePeriod} years` }</span>
                        </div>
                    </div>
                </div>
                <div className={`pointer-events-none grid text-center bg-[#f5f5f5] p-[10px] mt-[20px] lg:mt-0 ${role !=="admin" && !current && "group-hover:!bg-[#000244] group-hover:text-white cursor-pointer pointer-events-auto"}`}>
                    <span className='text-[16px] 2xl:text-[20px] font-semibold'>
                        {role === "admin" ? "Price" : (
                            current ? "Price" : "Buy @"
                        )}
                    </span>
                    {role === "admin" ? <span className='text-[16px] 2xl:text-[20px] font-semibold'>{money(price)}</span> : <span className='text-[16px] 2xl:text-[20px] font-semibold' onClick={draftHandler}>{money(price)}</span>}
                </div>
            </div>
            <PaymentPopup open={paymentSuccess} close={() => setPaymentSuccess(false)}/>
        </div>
    )
}

export default Statistics;