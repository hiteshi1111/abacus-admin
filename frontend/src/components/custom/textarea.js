import React from 'react'

const Textarea = ({disabled=false, value={}, onChange=()=>{}, className="", placeholder=""}) => {
    return (
        <textarea
            disabled={disabled}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={5}
            className={`h-[50px] w-full focus:outline-none hover:border-black border-[#c4c4c4] px-[8px] border focus:border-[#1E40AF] rounded-[5px] focus:shadow-[0_0_2px_#3c62e9] py-[5px] text-[16px] min-h-[80px] resize-none ${className}`}
        />
    )
}

export default Textarea;