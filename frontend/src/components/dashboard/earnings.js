import React, { useEffect, useState } from 'react'
import { money } from '../../utils/money';
// import { CircularProgress } from '@mui/material';

const Earnings = ({currentYearEarning, totalEarning, ...props}) => {
    const [progress, setProgress] = useState(10);
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);
    return (
        <div className='p-[30px] w-full flex justify-between items-center !bg-[#e9ffdb] mt-[30px]'>
            <div>
                <h5>Earnings</h5>
                <div className='flex flex-col justify-between mt-[20px]'>
                    <div className='grid mb-[10px]'>
                        <span className='text-[14px] 2xl:text-[16px]'>This Year</span>
                        <span className='text-[14px] 2xl:text-[16px]'>{money(currentYearEarning)}</span>
                    </div>
                    <div className='grid'>
                        <span className='text-[14px] 2xl:text-[16px]'>Total Earnings</span>
                        <span className='text-[14px] 2xl:text-[16px]'>{money(totalEarning)}</span>
                    </div>
                </div>
            </div>
            {!props.admin && (
                <CircularProgressWithLabel value={progress} />
            )}
        </div>
    )
}

function CircularProgressWithLabel(props) {
    return (
        <div className='relative inline-flex'>
            {/* <CircularProgress variant="determinate" {...props} size={100} color={'success'} thickness={8}/> */}
            <div
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <div variant="caption" component="div" color="text.secondary" className='!text-[20px] !font-bold'>
                    {`${Math.round(props.value)}%`}
                </div>
            </div>
        </div>
    );
}

export default Earnings;