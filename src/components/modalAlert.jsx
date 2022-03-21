import React from "react"
import "../App.css";
import UserDashboard from './accountActivity';

const ModalAlert = ({ children }) => {
    return (
        <div className="modal"> 
            <div className="modal-content">
                <button onClick={() => closeModal(false)}> X </button>
                <div className="title">
                    <h1>Transaction History</h1>
                </div>
                <div className="input-group-modal">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ModalAlert