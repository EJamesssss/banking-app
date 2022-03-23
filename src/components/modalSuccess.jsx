import React from 'react';
import "../App.css";

const ModalSuccess = ({ closeModal, modalContent }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="title">
                    <h1>SUCCESS !</h1>
                </div>
                <div className="input-group-modal">
                    <p>{modalContent}</p>
                </div>
                <div className="footer"  onClick={() => closeModal(false)}>
                    <h1>OK</h1>
                </div>
            </div>
        </div>
    )
}

export default ModalSuccess;

