import React from 'react'

const Tooltip = ({title="", position="top", children}) => {
    return (
        <div className='relative group'>
            {children}
            <span className={`hidden group-hover:block text-[14px] bg-[#aaa] px-[10px] absolute left-[-10px] shadow-md z-[1] ${className[position]}`}>{title}</span>
        </div>
    )
}

const className = {
    bottom: "top-[15px]",
    top: "top-[-15px]"
}

export default Tooltip;