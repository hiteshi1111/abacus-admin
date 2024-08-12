import React from 'react';
import ReactModal from "react-modal";

const Modal = ({open="", close=()=>{}, children}) => {
    return (
        <ReactModal
            isOpen={open}
            onRequestClose={close}
            style={customStyles}
        >
            {children}
        </ReactModal>
    )
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: 0,
        minWidth: '500px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
    },
};

export default Modal;