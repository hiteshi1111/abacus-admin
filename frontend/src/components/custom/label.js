import React from 'react'

const Label = ({ title="", htmlFor="", className="", important=false }) => {
    return (
        <label 
            htmlFor={htmlFor} 
            className={`flex mb-[5px] text-[14px] font-bold ${className}`}
        >{title}{important && <span className="pl-[3px] text-[#FF0000]">*</span>}</label>
    )
}

export default Label;