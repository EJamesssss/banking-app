import React,{useState} from "react";
import { Link, useParams } from "react-router-dom";
import DisplayHistoryTable from "./historytable";
import "../App.css";
import user from "../assets/images/user.png";
import logo from "../assets/images/logo.png";
import Success from './modalSuccess';
import Warning from './modalWarning';

const BudgetMain = () => {
    const localData = JSON.parse(localStorage.getItem('allAccounts'))
    const localHistory = JSON.parse(localStorage.getItem('trxhistory'))
    let records = []

    const [acctName, setAcctName] = useState(' --- ')
    const [acctNameHolder, setAcctNameHolder] = useState('')
    const [acctAmount, setAcctAmount] = useState('')
    const [newAmount, setNewAmount] = useState('')
    const [receiverAccount, setReceiverAccount] = useState('Select an Account')
    const [receiverAccountNumber, setReceiverAccountNumber] = useState('')
    const [acctNumber, setAcctNumber] = useState('')
    const [receiverAmount, setReceiverAmount] = useState('')
    const [txnWarning, setTxnWarning] = useState('')
    const [modalWarning, setModalWarning] = useState(false)
    const [txnResponse, setTxnResponse] = useState('')
    const [modalOpen, setModalOpen] = useState(false)

    const { profname } = useParams()
    let currentUser = ''

    for(let l = 0;l<localData.length; l++){
        if(localData[l].accountnumber == profname){
            currentUser = localData[l].name
        }
    }

    const gatherhistory =() => {
        for(let h = 0; h < localHistory.length; h++){
            if(localHistory[h].sourceaccount == currentUser){
                records.push(localHistory[h])
            }
        }
    }

    gatherhistory()
    const expenseapp = '/expense/'+ profname

    const handleSelectedAccount = (e) => {
        setAcctName(e.target.value)
    }

    const handleReceiverAccount = (e) => {
        setReceiverAccount(e.target.value)
    }

    const handleOpenAccountDetails = (e) => {
        e.preventDefault()

        for(let actDet = 0;actDet < localData.length;actDet++){
            if(acctName == localData[actDet].name){
                setAcctAmount(localData[actDet].balance)
                setAcctNumber(localData[actDet].accountnumber)
            }
        }

        setAcctNameHolder(acctName)

    }

    const handleOpenReceiverAccount = (e) => {
        e.preventDefault()

        for(let r = 0;r < localData.length;r++){{
            if(receiverAccount == localData[r].name){
                setReceiverAmount(localData[r].balance)
                setReceiverAccountNumber(localData[r].accountnumber)
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
        const existingAmount = parseFloat(acctAmount)
        const newAmountInt = parseFloat(newAmount)

        const updatedAmount = (existingAmount - newAmountInt).toString()

        if(newAmount == "" || newAmount == null){
            const warningWithdraw = "Please enter an amount to withdraw"
            setTxnWarning(warningWithdraw)
            setModalWarning(true)
        }else{
            if(newAmount > existingAmount){
                const warningInsufficient = "Insufficient funds!"
                setTxnWarning(warningInsufficient)
                setModalWarning(true)
            }else{
                for(let w =0; w < localData.length;w++){
                    if(acctName == localData[w].name){
                        localData[w].balance = updatedAmount
                    }
                }
                localStorage.setItem('allAccounts', JSON.stringify(localData))
                saveHistory(txntype,acctName,newAmount,destaccount,updatedAmount)
        
                setAcctAmount(updatedAmount)
                const modalMessage = `Withdraw successful: ${newAmount}Php to account of ${acctName}`
                setNewAmount('')
                setTxnResponse(modalMessage)
                setModalOpen(true)
                
            }
        }

    }

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

    const handleDeposit = (e) => {
        e.preventDefault()

        const txntype = 'deposit'
        const destaccount = ''
        const existingAmountDeposit = parseFloat(acctAmount)
        const newAmountDeposit = parseFloat(newAmount)

        const updateDeposit = (existingAmountDeposit + newAmountDeposit).toString()
        
        if(newAmount == "" || newAmount == null){
            const warningDeposit = "Please enter an amount to withdraw"
            setTxnWarning(warningDeposit)
            setModalWarning(true)
        }else{
            for(let d = 0; d < localData.length; d++){
                if(acctName == localData[d].name){
                    localData[d].balance = updateDeposit
                }
            }
            localStorage.setItem('allAccounts', JSON.stringify(localData))
            saveHistory(txntype,acctName,newAmount,destaccount,updateDeposit)
    
            setAcctAmount(updateDeposit)
            const modalDeposit = `Deposit successful: ${newAmountDeposit}Php to account of ${acctName}`
            setNewAmount('')
            setTxnResponse(modalDeposit)
            setModalOpen(true)
        }

    }

    const handleTransfer = (e) => {
        e.preventDefault()
        const transferAmount = parseFloat(newAmount)
        const senderAccount = parseFloat(acctAmount)
        const recAccount = parseFloat(receiverAmount)
        const txntype = 'transfer'

        //Sender Account
        const deductSender = (senderAccount - transferAmount).toString()
        //Receiver Account
        const addReceiver = (recAccount + transferAmount).toString()

        if(receiverAccount == 'Select an Account' || receiverAccount == null && newAmount == "" || newAmount == null ){
            const warningTransfer = "Please enter an amount to transfer and an account where to transfer"
            setTxnWarning(warningTransfer)
            setModalWarning(true)
        }else if(newAmount == "" || newAmount == null){
            const warningTransferAmount = "Please enter an amount to transfer"
            setTxnWarning(warningTransferAmount)
            setModalWarning(true)
        }else if(receiverAccount == 'Select an Account' || receiverAccount == null){
            const warningReceiver = "Please select a receiver's account"
            setTxnWarning(warningReceiver)
            setModalWarning(true)
        }else if(acctNumber === receiverAccountNumber){
            const warningSameAccount = "You cannot transfer to the same account"
            setTxnWarning(warningSameAccount)
            setModalWarning(true)
        }else{
            for(let sender = 0; sender < localData.length;sender++){
                if(acctName == localData[sender].name){
                    localData[sender].balance = deductSender
                }
            }
            

    
    
            for(let rec = 0;rec < localData.length;rec++){
                if(receiverAccount == localData[rec].name){
                    localData[rec].balance = addReceiver
                }
            }
    
            localStorage.setItem('allAccounts',JSON.stringify(localData))
            saveHistory(txntype,acctName,newAmount,receiverAccount,deductSender)
            const modalTransfer = `The amount ${transferAmount}Php has been transfered from ${acctName} to ${receiverAccount}`
            setNewAmount("")
            setAcctAmount(deductSender)
            setReceiverAmount(addReceiver)
            setTxnResponse(modalTransfer)
            setModalOpen(true)
        }



    }

    return(
        <section id="view_loggedin">
            <nav>
                <img src={logo} />
                <h1>
                    PiggyBank<span>.</span>
                </h1>
                <ul className="nav-options">
                    <li className="active-nav" data-view="register">Dashboard</li>
                    <Link to={expenseapp}><li data-view="expense">Expense</li></Link>
                    <Link to="/"><li data-view="login" >Logout</li></Link>
                </ul>
            </nav>
            <div>
                <article className="view_usercard">
                    <div className="wrapper">
                        <div className="user_informations">
                            <img id="user_avatar" src={user} alt="user" />
                            <div className="user_meta_container">
                                <h1 id="user_name">
                                    <span id="name">{currentUser}</span>
                                </h1>
                                <p id="user_accountnumber">
                                    <span>Account number: &nbsp; <i className="ion-card"> &nbsp; </i></span>
                                    <span id="accountnumber">{profname}</span> 
                                </p>
                                <p id="user_balance">
                                    <span>PHP &nbsp;</span>
                                    <span id='balance'>{acctAmount}</span>
                                </p>
                            </div>
                        </div>
                        <div>
                            <div className="tableScroll">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Transaction Type</th>
                                            <th>Source Account</th>
                                            <th>Amount</th>
                                            <th>Destination Account</th>
                                            <th>Remaining Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {records.map((rec) =>(
                                            <DisplayHistoryTable rec={rec}/>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
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
                                                { localData.map((acctName) =>  
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
                            <form id="form_deposit" onSubmit={handleOpenReceiverAccount} >                                
                                <div className="input-group spacing">
                                    <label> Amount </label>
                                    <input type="number" name="newamount"  value={newAmount} onChange={handleNewAmount}/>

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
                                        <input type="number" name="newamount" />
                                    </div>
                                    <div className="input-group">
                                        <button type="submit">
                                            <i className="ion-android-checkmark-circle"></i>
                                            &nbsp;
                                            Show Account
                                        </button>
                                    </div>
                                    <br />
                                    <p>Php: </p>
                                    <p>Account Number: </p>
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

export default BudgetMain