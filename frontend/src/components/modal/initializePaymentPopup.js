import React from 'react'
import Modal from '.'

const InitializePaymentPopup = ({setTrigger=()=>{}}) => {
    
  return (
    <>
        <IconButton
            title='Add'
            icon={<MdAdd size={20} />}
            onClick={() => setModalOpen(true)}
            className='bg-[#21407E] text-white hover:text-[#21407E] px-[10px] w-full'
        />
        <Modal open={modalOpen} close={() => setModalOpen(false)}>
                {disabled && (<Loader />)}
                
                <div className='w-[100%] max-w-[700px] mx-auto px-[30px] py-[10px]'>
                </div>
        </Modal>
    </>
  )
}

export default InitializePaymentPopup