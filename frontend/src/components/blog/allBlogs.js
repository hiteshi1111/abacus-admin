import React, { useEffect, useState } from 'react'
import { GetRequest, DeleteRequest } from '../../utils/requests';
import { MdDelete } from "react-icons/md";
import DeletePopup from '../modal/deletePopup';

const AllBlogs = ({trigger, setTrigger=()=>{}}) => {
    const [ blogData, setBlogData ] = useState([]);
    useEffect(() => {
        GetRequest(process.env.REACT_APP_API_URL + 'blog/').then(response => {
            setBlogData(response.data)
        }).catch(err => {
            console.log("error >", err)
        });
    },[trigger])

    function deleteHandler(id){
        DeleteRequest(process.env.REACT_APP_API_URL + 'blog/' + id).then(response => {
            setTrigger(prev => prev+1)
        }).catch(err => {
            console.log("error >", err)
        });
    }

    return (
        <>
        <div className='flex justify-between items-center border-b py-[10px] mt-[30px]'>
            <h2 className="capitalize text-[25px] leading-[92.857%] font-bold text-[#21407E] w-full px-[30px]">All Blogs</h2>
        </div>
        <div className='grid grid-cols-3 gap-[10px] mt-[20px]'>
            {blogData.map((item, i) => (
                <div key={i} className='relative bg-[#f2f3f4] w-full p-[20px] 2xl:p-[30px] group'>
                    <div className='group-hover:block hidden absolute top-[5px] right-[5px]'>
                        <DeletePopup  
                            title="Are you sure you want to delete the selected blog?"
                            subTitle="This action can not be undone!"
                            action={() => deleteHandler(item._id)}
                            className='bg-transparent'
                            icon={<MdDelete size={18} color='#dc143c' />} 
                        />
                    </div>
                    <h5>{item.title}</h5>
                    <span className='text-[12px]'>blog/{item.handle}</span>
                    <p>{item.shortDescription}</p>
                </div>
            ))}
        </div>
        </>
    )
}

export default AllBlogs;