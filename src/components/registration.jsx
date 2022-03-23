import React, {useState} from "react";
import "../App.css";
import piggyBank from "../assets/images/piggybank.gif";
import Success from './modalSuccess';
import Warning from './modalWarning';


const AddNewUser = () => {

    const [name, setName] = useState('')
    const [bal, setBal] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
    const [txnResponse, setTxnResponse] = useState('')
    const [modalWarning, setModalWarning] = useState(false)
    const [txnWarning, setTxnWarning] = useState('')

    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const handleChangeBalance = (e) => {
        setBal(e.target.value)
    }


    const handleClick = (e) => {
        e.preventDefault()

        let acctNumber = Math.floor(100000 + Math.random() * 900000)

        let userData = {
            "name": name,
            "balance": bal,
            "accountnumber": acctNumber,
        }

        if(localStorage.getItem('allAccounts') == null){
            localStorage.setItem('allAccounts',JSON.stringify([]))
        }

        var oldData = JSON.parse(localStorage.getItem('allAccounts'))

        if(name === '' || name === null || bal === '' || bal === null){
            const warningCheck = "Please fill up all the needed data."
            setTxnWarning(warningCheck)
            setModalWarning(true)
        }else{
            if(oldData.length === 0){
                oldData.push(userData)
                localStorage.setItem('allAccounts', JSON.stringify(oldData))
                const successRegister = `You have successfully opened a bank account! \n Account Name: ${name}\n Account Number: ${acctNumber}\n Balance: ${bal}`
                setTxnResponse(successRegister)
                setModalOpen(true)
                setName('')
                setBal('')
            }else{
                if(name === oldData.name){
                    const warningFillup = "Account name already in use"
                    setTxnWarning(warningFillup)
                    setModalWarning(true)
                }else{
                    oldData.push(userData)
                    localStorage.setItem('allAccounts', JSON.stringify(oldData))
                    const successRegister2 = `You have successfully opened a bank account! \n Account Name: ${name}\n Account Number: ${acctNumber}\n Balance: ${bal}`
                    setTxnResponse(successRegister2)
                    setModalOpen(true)
                    setName('')
                    setBal('')
                }
            }
        }
    }

    

    return(
        <section id="view_initial">
            <div>
                <article className="view_initial_img">
                    <p>Small steps to a better future with</p>
                    <p><b>PiggyBank.</b></p>
                    <img src={piggyBank} alt="PiggyBank" />
                </article>
                <article className="view_initial_nav">
                    <div className="view_initial_nav_dynamic">
                        <div id="dynamic_register" data-view="register">
                            <form id="form_register" onSubmit={handleClick}>
                                <div className="input-group">
                                    <label> Full Name:</label>
                                    <input type='text' name="fullname" value={name} onChange={handleChangeName} />
                                </div>
                                <div className="input-group">
                                    <label> Balance:</label>
                                    <input type='number' name="balance" value={bal} onChange={handleChangeBalance} />
                                </div>
                                <div className="input-group">
                                    <button type="submit">
                                        <i className="ion-android-checkmark-circle"></i>
                                        &nbsp;
                                        Register User
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </article>
            </div>
            {modalOpen && <Success closeModal={setModalOpen} modalContent={txnResponse} />}
            {modalWarning && <Warning closeWarningModal={setModalWarning} modalContentWarning={txnWarning} />}
        </section>
    )
}

export default AddNewUser