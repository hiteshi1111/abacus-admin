import React from 'react'

const Select = ({options, value, onChange=()=>{}}) => {
    return (
        <select 
            value={value} 
            onChange={onChange}
            className='w-full border h-[45px] focus:outline-none hover:border-black border-[#c4c4c4] focus:border-[#1E40AF] focus:shadow-[0_0_2px_#3c62e9] px-[10px]'
        >
            {options.map((item, i) => (
                <option key={i} value={item}>{item}</option>
            ))}
        </select>
    )
}

export default Select;