import React, {useState} from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import logo from "../assets/images/logo.png";
import edit from "../assets/images/edit.png";
import user from "../assets/images/user.png";
import history from "../assets/images/history.jpg";
import Modal from './modal'

const UserDashboard = () => {
    let storageData = JSON.parse(localStorage.getItem('allAccounts'))
    // console.log(storageData)


    let {profname} = useParams()
    let [acctName, setAcctName] = useState(profname)
    let [acctNameHolder, setAcctNameHolder] = useState(profname)
    let [acctAmount, setAcctAmount] = useState('')
    let [newAmount, setNewAmount] = useState('')
    let [receiverAccount, setReceiverAccount] = useState('Select an Account')
    let [receiverAmount, setReceiverAmount] = useState('')
    let [acctNumber, setAcctNumber] = useState('')

    function saveHistory(trxType,sourceaccount,trxAmount, destinationaccount, remainingbalance){
        const today = new Date()
        const dd = String(today.getDate()).padStart(2,'0')
        const mm = String(today.getMonth()+1).padStart(2,'0')
        const yyyy = String(today.getFullYear())
        const showDate = mm + '/' + dd + '/' + yyyy
        console.log(showDate)
        let trxHistory ={
            date: showDate,
            type: trxType,
            sourceaccount: sourceaccount,
            trxAmount: trxAmount,
            destinationaccount: destinationaccount,
            remainingbalance: remainingbalance
        }

        if(localStorage.getItem('trxhistory') == null){
            localStorage.setItem('trxhistory',JSON.stringify([]))
        }

        let localHistory = JSON.parse(localStorage.getItem('trxhistory'))

        localHistory.push(trxHistory)
        localStorage.setItem('trxhistory',JSON.stringify(localHistory))
    }




    let handleSelectedAccount = (e) => {
        setAcctName(e.target.value)
    }

    let handleReceiverAccount = (e) => {
        setReceiverAccount(e.target.value)
    }

    let handleOpenAccountDetails = (e) => {
        e.preventDefault()

        for(let actDet = 0;actDet < storageData.length;actDet++){
            if(acctName == storageData[actDet].name){
                setAcctAmount(storageData[actDet].balance)
                setAcctNumber(storageData[actDet].accountnumber)
            }
        }

        setAcctNameHolder(acctName)

    }

    let handleOpenReceiverAccount = (e) => {
        e.preventDefault()

        for(let r = 0;r < storageData.length;r++){{
            if(receiverAccount == storageData[r].name){
                setReceiverAmount(storageData[r].balance)
            }
        }}
    }

    const handleNewAmount = (e) => {
        setNewAmount(e.target.value)
    }

    const handleWithdraw = (e) => {
        e.preventDefault()
        const txntype = 'withdraw'
        const destaccount = ''
        const existingAmount = parseInt(acctAmount)
        const newAmountInt = parseInt(newAmount)

        const updatedAmount = (existingAmount - newAmountInt).toString()

        if(newAmount == "" || newAmount == null){
            alert("Please enter an amount to withdraw")
        }else{
            if(newAmount > existingAmount){
                alert('Insufficient funds!')
            }else{

                localStorage.setItem('allAccounts', JSON.stringify(storageData))
                saveHistory(txntype,acctName,newAmount,destaccount,updatedAmount)
        
                setAcctAmount(updatedAmount)

                alert(`Withdraw successful: ${newAmount} to account of ${acctName}`)
                setModalOpen(true)
                {modalOpen && <Modal closeModal={setModalOpen} />}
                setNewAmount('')
            }
        }

    }

    let handleDeposit = (e) => {
        e.preventDefault()

        const txntype = 'deposit'
        const destaccount = ''
        const existingAmountDeposit = parseInt(acctAmount)
        const newAmountDeposit = parseInt(newAmount)

        const updateDeposit = (existingAmountDeposit + newAmountDeposit).toString()
        
        if(newAmount == "" || newAmount == null){
            alert("Please enter an amount to deposit")
        }else{

            localStorage.setItem('allAccounts', JSON.stringify(storageData))
            saveHistory(txntype,acctName,newAmount,destaccount,updateDeposit)
    
            setAcctAmount(updateDeposit)
            alert(`Deposit successful: ${newAmountDeposit} to account of ${acctName}`)
            setNewAmount('')
        }

    }

    let handleTransfer = (e) => {
        e.preventDefault()
        const transferAmount = parseInt(newAmount)
        const senderAccount = parseInt(acctAmount)
        const recAccount = parseInt(receiverAmount)
        const txntype = 'transfer'

        //Sender Account
        const deductSender = (senderAccount - transferAmount).toString()
        //Receiver Account
        const addReceiver = (recAccount + transferAmount).toString()

        if(newAmount == "" || newAmount == null && receiverAccount == 'Select an Account' || receiverAccount == null ){
            alert(`Please enter an amount to transfer and an account where to transfer`)
        }else if(newAmount == "" || newAmount == null){
            alert(`Please enter an amount to transfer`)
        }else if(receiverAccount == 'Select an Account' || receiverAccount == null){
            alert(`Please select a receiver's account`)
        }else if(acctName === receiverAccount){
            alert(`You cannot transfer to the same account`)
        }else{
            for(let sender = 0; sender < storageData.length;sender++){
                if(acctName == storageData[sender].name){
                    storageData[sender].balance = deductSender
                }
            }
            

    
    
            for(let rec = 0;rec < storageData.length;rec++){
                if(receiverAccount == storageData[rec].name){
                    storageData[rec].balance = addReceiver
                }
            }
    
            localStorage.setItem('allAccounts',JSON.stringify(storageData))
            saveHistory(txntype,acctName,newAmount,receiverAccount,deductSender)
            alert(`The amount ${transferAmount} has been transfered from ${acctName} to ${receiverAccount}`)
            setNewAmount("")
            setAcctAmount(deductSender)
            setReceiverAmount(addReceiver)
        }



    }

    const [modalOpen, setModalOpen] = useState(false)

    return(
        <section id="view_loggedin">
            <div onLoad={handleOpenAccountDetails}>
                <article className="view_usercard">
                    <div className="wrapper">
                        <div className="user_informations">
                            <img id="user_avatar" src={user} alt="user" />
                            <div className="user_meta_container">
                                <h1 id="user_name">
                                    <span id="name">{acctNameHolder}</span>
                                </h1>
                                <p id="user_accountnumber">
                                    <span>Account Number: &nbsp; <i className="ion-card"> &nbsp; </i></span>
                                    <span id="accountnumber">{acctNumber}</span>
                                </p>
                                <p id="user_balance">
                                    <span>PHP &nbsp;</span>
                                    <span id='balance'>{acctAmount}</span>
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className="history" onClick={() => {
                                setModalOpen(true);
                                }}
                                >
                                <img src={history} title="Edit Account" />  
                            </div>
                            {modalOpen && <Modal closeModal={setModalOpen} withdrawAmount={newAmount} />}
                        </div>
                    </div>

                </article>
                <article className="view_useractions">
                    <div className="wrapper view_useractions_parent">
                        <div id="dynamic_deposit" data-action="deposit">
                            <form id="form_deposit" onSubmit={handleOpenAccountDetails}>                                
                                <div className="input-group"> 
                                    <div className="input-group spacing">
                                        <label> User Account </label>
                                        <select onChange={handleSelectedAccount}>
                                            <option value=' '> -- Select An Account --</option>
                                                { storageData.map((acctName) =>  
                                                    <option key={acctName.name} value={acctName.value}>{acctName.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="input-group">
                                        <button type="submit">
                                            <i className="ion-android-checkmark-circle"></i>
                                            &nbsp;
                                            Show Account
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    
                    <div className="wrapper view_useractions_parent">
                        <div id="dynamic_deposit" data-action="deposit">
                            <form id="form_deposit" onSubmit={handleOpenReceiverAccount}>                                
                                <div className="input-group spacing">
                                    <label> Amount </label>
                                    <input type="number" name="newamount" value={newAmount} onChange={handleNewAmount} min="0" />

                                    <button onClick={handleWithdraw}>
                                        <i className="ion-android-checkmark-circle"></i>
                                        &nbsp;
                                        Withdraw
                                    </button>
                                    <button onClick={handleDeposit}>
                                        <i className="ion-android-checkmark-circle"></i>
                                        &nbsp;
                                        Deposit
                                    </button>
                                    <button onClick={handleTransfer}>
                                        <i className="ion-android-checkmark-circle"></i>
                                        &nbsp;
                                        Transfer
                                    </button>
                                </div>
                                <div className="input-group">                                                  
                                    <div className="input-group spacing">
                                        <label> Receiver Account </label>
                                        <select onChange={handleReceiverAccount}>
                                            <option value='Select an account'> -- Select An Account --</option>
                                                { storageData.map((receiverAccount) =>  
                                                    <option key={receiverAccount.name} value={receiverAccount.value}>{receiverAccount.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="input-group">
                                        <button type="submit">
                                            <i className="ion-android-checkmark-circle"></i>
                                            &nbsp;
                                            Show Account
                                        </button>
                                    </div>
                                    <br />
                                    <p>Php: {receiverAmount}</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    )
}

export default UserDashboard
