import React, {useState} from 'react';
import IconButton from '../custom/iconButton';
import { FaEye } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

import Modal from '.';

function ContactView({userData}) {
    const [ modalOpen, setModalOpen ] = useState(false);

    return (
        <>
            <IconButton
                icon={<FaEye size={15} />}
                className='!bg-[#dcdcdc] !mr-[10px] !h-[35px] !w-[35px] !min-w-[35px]'
                onClick={() => setModalOpen(true)}
            />
             <Modal open={modalOpen} close={() => setModalOpen(false)}>
             <div className='text-center text-[24px] font-bold flex justify-between items-center bg-[#10203f] px-[30px] py-[10px]'>
                    <h4 className='text-white'>Contacts</h4>
                    <IconButton
                        icon={<MdClose size={20} color='#fff' />}
                        onClick={() => {
                            setModalOpen(false);
                            // resetHandler();
                        }}
                        className='!p-0'
                    />
                </div>
    
                <div className=" w-[100%] max-w-[700px] mx-auto px-[30px] py-[10px] ">
            <div className="bg-[#fff] w-[400px]">
                <ul className="divide-y divide-gray-200">
                    <li className="py-2 flex">
                        <span className="font-semibold min-w-[75px] text-gray-700">Full Name:</span>
                        <span className="ml-2 text-sm text-gray-800">{userData.firstName}</span>
                    </li>
                    <li className="py-2 flex">
                        <span className="font-semibold min-w-[75px] text-gray-700">Last Name:</span>
                        <span className="ml-2 text-sm text-gray-800">{userData.lastName}</span>
                    </li>
                    <li className="py-2 flex">
                        <span className="font-semibold min-w-[75px] text-gray-700">Email:</span>
                        <span className="ml-2 text-sm text-gray-800">{userData.email}</span>
                    </li>
                    <li className="py-2 flex">
                        <span className="font-semibold min-w-[75px] text-gray-700">Phone:</span>
                        <span className="ml-2 text-sm text-gray-800">{userData.phone}</span>
                    </li>
                    <li className="py-2 flex">
                        <span className="font-semibold min-w-[75px] text-gray-700">Subject:</span>
                        <span className="ml-2 text-sm text-gray-800">{userData.subject}</span>
                    </li>
                    <li className="py-2 flex">
                        <span className="font-semibold min-w-[75px] text-gray-700">Message:</span>
                        <span className="ml-2 text-sm text-gray-800">{userData.message}</span>
                    </li>
                </ul>
            </div>
        </div>
            </Modal>
        </>
    )
}
export default ContactView