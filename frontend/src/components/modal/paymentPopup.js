import React from 'react'
import Modal from '.'
import { MdClose } from 'react-icons/md'
import IconButton from '../custom/iconButton'

const PaymentPopup = ({open, close=()=>{}}) => {
  return (
        <Modal open={open} close={close}>
            <div className='text-center text-[24px] font-bold text-[#000] items-center px-[30px] py-[10px]'>
            <IconButton
                icon={<MdClose size={20} color='#fff' />}
                close={close}
                className='!p-0'
            />
            <h2>Your Payment has been successfull.</h2>
            </div>
        </Modal>
  )
}

export default PaymentPopup