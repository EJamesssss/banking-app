import React from "react"
import "../App.css";
import UserDashboard from './accountActivity';

const Modal = ({ closeModal }) => {
    return (
        <div className="modal"> 
            <div className="modal-content">
                <div className="title">
                    <h1>Add Users Bank Account</h1>
                </div>
                <div className="input-group-modal">
                    
                </div>
                <div className="footer"  onClick={() => closeModal(false)}>
                    <h1>OK</h1>
                </div>
            </div>
        </div>
    )
}

export default Modal