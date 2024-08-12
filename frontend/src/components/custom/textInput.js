import React from 'react';

const TextInput = ({type="", disabled=false, value={}, onChange=()=>{}, className="", placeholder="", errorText="", maxLength, icon="", ...props}) => {
    return (
        <>
        {icon ? (
            <div className='relative'>
                <input
                    disabled={disabled}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    type={type || "text"}
                    className={`h-[40px] lg:h-[45px] w-full focus:outline-none hover:border-black border-[#c4c4c4] pl-[25px] pr-[10px] border focus:border-[#1E40AF] focus:shadow-[0_0_2px_#3c62e9] text-[14px] ${className}`}
                    {...props}
                />
                {errorText && (
                    <span className='text-[#FF0000] text-[12px]'>{errorText}</span>
                )}
                <div className='absolute left-0 inset-y-[11px] px-[5px]'>{icon}</div>
            </div>
        ):(
            <>
            <input
                disabled={disabled}
                maxLength={maxLength}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                type={type || "text"}
                className={`h-[40px] lg:h-[45px] w-full focus:outline-none hover:border-black border-[#c4c4c4] px-[10px] border focus:border-[#1E40AF] focus:shadow-[0_0_2px_#3c62e9] text-[14px] ${className}`}
                {...props}
            />
            {errorText && (
                <span className='text-[#FF0000] text-[12px]'>{errorText}</span>
            )}
            </>
        )}
        </>
    )
}

export default TextInput;