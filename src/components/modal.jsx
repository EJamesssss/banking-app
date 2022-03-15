import React from 'react';
import "../App.css";

function Modal({ closeModal }) {
    return (
        <div className="modal">
            <div className="modal-content">
                <button onClick={() => closeModal(false)}> X </button>
                <div className="title">
                    <h1>Transaction History</h1>
                </div>
                <div className="input-group-modal">
                    <p>Withdraw</p>
                    <p>Deposit</p>
                    <p>Transfer</p>
                </div>
                <div className="footer"></div>
            </div>
        </div>
    )
}

export default Modal;

