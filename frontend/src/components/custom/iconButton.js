import React from 'react'

const IconButton = ({onClick=()=>{}, icon, className="", title=""}) => {
    return (
        <button 
            onClick={onClick} 
            className={`h-[40px] w-[40px] min-w-[40px] flex justify-center items-center hover:bg-[#0d3b8936] rounded-full transition-all duration-500 hover:opacity-60 ${className}`}
        >
            {icon}
            {title && (
                <span className='text-[14px]'>{title}</span>
            )}
        </button>
    )
}

export default IconButton;