import React from 'react';

const ActionButton = ({title="", onClick=()=>{}, className="", disabled=false, variant="primary", animation=false}) => {
    return (
        <button 
            disabled={disabled} 
            className={`h-[40px] lg:h-[45px] text-[18px] ${disabled && "bg-[#008000]"} ${className} transition-all duration-300 shadow-md ${variants[variant]} ${animation && "hover:font-bold hover:bg-gradient-to-tr hover:from-blue-900 hover:to-blue-50 hover:text-[#071D43] hover:rounded-[30px]"}`} 
            onClick={onClick}
        >
            {title}
        </button>
    )
}

const variants = {
    primary: "text-white bg-[#0d3b89]",
    secondary: "border border-[#0d3b89] text-[#0d3b89] bg-white"
}

export default ActionButton