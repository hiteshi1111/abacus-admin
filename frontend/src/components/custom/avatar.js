import React from 'react'

const Avatar = ({initialLetter="", userData="", className=""}) => {
    return (
        <div className={`text-white bg-white h-[40px] w-[40px] rounded-full flex justify-center items-center ${className}`}>
            <span className='text-black text-[14px] font-semibold'>{initialLetter}</span>
        </div>
    )
}

export default Avatar;