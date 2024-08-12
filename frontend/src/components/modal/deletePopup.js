import React, { useState } from 'react';
import IconButton from '../custom/iconButton';
import Modal from '.';
import { BiError } from 'react-icons/bi';
import ActionButton from '../custom/actionButton';

const DeletePopup = ({title, subTitle, icon, action=()=>{}, className=""}) => {
    const [ modalOpen, setModalOpen ] = useState(false);
    return (
        <>
            <IconButton 
                icon={icon} 
                onClick={() => setModalOpen(true)} 
                className={`bg-[#dc143c] ${className}`}
            />
            <Modal open={modalOpen} close={() => setModalOpen(false)}>
                <div className='p-[30px]'>
                    <div className='flex justify-center'>
                        <BiError size={50} color='#dc143c' />
                    </div>
                    <div className='mt-[10px]'>
                        <div className='text-[20px] text-center'>
                            {title}
                        </div>
                        <div className='text-[16px] text-center max-w-[350px] mx-auto'>
                            {subTitle}
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-[10px] mt-[30px]'>
                        <ActionButton
                            title='Yes'
                            className='w-full bg-[#dc143c]'
                            variant="primary" 
                            onClick={() => {
                                action()
                                setModalOpen(false)
                            }}
                        />
                        <ActionButton
                            title='No'
                            variant="secondary" 
                            onClick={() => setModalOpen(false)}
                        />
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default DeletePopup;