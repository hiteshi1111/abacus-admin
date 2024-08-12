import React from 'react'
import { BiSearch } from 'react-icons/bi';

const Search = ({value, onChange, className=""}) => {
    return (
        <div className={`w-full h-[40px] px-[10px] border rounded-full flex items-center ${className}`}>
            <BiSearch size={20} color='#21407E' />
            <input 
                placeholder="Search…"
                value={value}
                onChange={onChange}
                className='w-[80px] text-[14px] h-[38px] px-[10px] rounded-full outline-none focus:w-[200px] transition-all duration-500'
            />
        </div>
    )
}

export default Search;