import React from 'react';
import "../App.css";

const ModalWarning = ({ closeWarningModal, modalContentWarning }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="titleWarning">
                    <h1>WARNING !</h1>
                </div>
                <div className="input-group-modal">
                    <p>{modalContentWarning}</p>
                </div>
                <div className="footer"  onClick={() => closeWarningModal(false)}>
                    <h1>OK</h1>
                </div>
            </div>
        </div>
    )
}

export default ModalWarning;

