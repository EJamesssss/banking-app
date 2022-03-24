import React, {useState, Fragment} from "react";
import ReadOnlyRows from './readrows'
import "../App.css";
import Modal from './modal';
import history from "../assets/images/history.jpg";
import Success from './modalSuccess';
import Warning from './modalWarning';


const AllUsers = () => {
    var userData = JSON.parse(localStorage.getItem('allAccounts'))

    const [userList, setUserList] = useState(userData)
    // const [modalOpen, setModalOpen] = useState(false)
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
        // e.preventDefault()

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
        <section id="view_loggedin">
            <div>
                <article className="view_usercard">
                    <div className="wrapper">
                        <div className="user_informations">
                            {/* <div>
                                <div className="history" onClick={() => {
                                    setModalOpen(true);
                                    }}
                                    >
                                    <img src={history} title="Edit Account" />  
                                </div>
                                {modalOpen && <Modal closeModal={setModalOpen}/>}
                            </div> */}
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Account Number</th>
                                        <th>Balance</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userList.map((user) =>(
                                        <ReadOnlyRows user={user}/>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </article>
                <article className="view_useractions">
                    <div className="wrapper view_useractions_parent">
                        <div id="dynamic_deposit" data-action="deposit">
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
                                        Add Account
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

export default AllUsers