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
    const { profname } = useParams()
    let records = []

    const [newAmount, setNewAmount] = useState('')
    const [receiverAccountNumber, setReceiverAccountNumber] = useState('')
    const [txnWarning, setTxnWarning] = useState('')
    const [modalWarning, setModalWarning] = useState(false)
    const [txnResponse, setTxnResponse] = useState('')
    const [modalOpen, setModalOpen] = useState(false)

    
    let currentUser = ''
    let acctAmount = ''
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

        // localHistory = JSON.parse(localStorage.getItem('trxhistory'))

        localHistory.push(trxHistory)
        localStorage.setItem('trxhistory',JSON.stringify(localHistory))
    }

    for(let l = 0;l<localData.length; l++){
        if(localData[l].accountnumber == profname){
            currentUser = localData[l].name
            acctAmount = localData[l].balance
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

    const handleNewAmount = (e) => {
        setNewAmount(e.target.value)
    }

    const handleReceiver = (e) => {
        setReceiverAccountNumber(e.target.value)
    }

    const handleWithdraw = (e) => {
        e.preventDefault()
        const txntype = 'withdraw'
        const destaccount = ''
        const currentBalance = parseFloat(acctAmount)
        const withdrawAmount = parseFloat(newAmount)

        const withdrawUpdate = (currentBalance - withdrawAmount).toString()


        if(newAmount == "" || newAmount == null){
            const warningWithdraw = "Please enter an amount to withdraw"
            setTxnWarning(warningWithdraw)
            setModalWarning(true)
        }else{
            if(withdrawAmount > currentBalance){
                const warningInsufficient = "Insufficient funds!"
                setTxnWarning(warningInsufficient)
                setModalWarning(true)
            }else{
                for(let w = 0; w < localData.length; w++){
                    if(profname == localData[w].accountnumber){
                        localData[w].balance = withdrawUpdate
                        {break}
                    }
                }
                localStorage.setItem('allAccounts', JSON.stringify(localData))
                saveHistory(txntype,currentUser,newAmount,destaccount,withdrawUpdate)
        
                // setAcctAmount(updatedAmount)
                const modalMessage = `Withdraw successful: ${newAmount}Php to account of ${currentUser}`
                setNewAmount('')
                setTxnResponse(modalMessage)
                setModalOpen(true)
                
            }
        }
        acctAmount = withdrawUpdate
    }

    const handleDeposit = (e) => {
        e.preventDefault()
        const txntype = 'deposit'
        const destaccount = ''
        const currentBalance = parseFloat(acctAmount)
        const withdrawAmount = parseFloat(newAmount)

        const depositUpdate = (currentBalance + withdrawAmount).toString()

        if(newAmount == "" || newAmount == null){
            const warningWithdraw = "Please enter an amount to withdraw"
            setTxnWarning(warningWithdraw)
            setModalWarning(true)
        }else{
            for(let d =0; d < localData.length; d++){
                if(profname == localData[d].accountnumber){
                    localData[d].balance = depositUpdate
                    {break}
                }
            }
            localStorage.setItem('allAccounts', JSON.stringify(localData))
            saveHistory(txntype,currentUser,newAmount,destaccount,depositUpdate)
            const modalMessage = `Deposit successful: ${newAmount}Php to account of ${currentUser}`
            setNewAmount('')
            setTxnResponse(modalMessage)
            setModalOpen(true)
        }

        acctAmount = depositUpdate

    }

    const handleTransfer = (e) => {
        e.preventDefault()

        // const txntype = 'transfer'
        // let destaccount = ''
        // const currentBalance = parseFloat(acctAmount)
        // const transferAmount = parseFloat(newAmount)
        // let receiverAccountBalance = 0
        // let sameBank = false
        // let recAccountNumber = ''

        // const transferUpdateSender = (currentBalance - transferAmount).toString() 
        // const transferUpdateReceiver = (receiverAccountBalance + transferAmount).toString()

        // if(newAmount == "" || newAmount == null || receiverAccountNumber == '' || receiverAccountNumber == null){
        //     const warningWithdraw = "Please make sure to enter both amount to transfer and account number where to transfer"
        //     setTxnWarning(warningWithdraw)
        //     setModalWarning(true)
        // }else{
        //     for(let ca = 0; ca < localData.length; ca++){
        //         if(receiverAccountNumber == localData[ca].accountnumber){
        //             sameBank = true
        //             destaccount = localData[ca].name
        //             receiverAccountBalance = localData[ca].balance
        //             recAccountNumber = localData[ca].accountnumber
        //             console.log(`Destination: ${destaccount} \n Receiver Balance: ${receiverAccountBalance} \n Same Bank: ${sameBank}`)
        //         }else{
        //             destaccount = receiverAccountNumber
        //             sameBank = false
        //         }
        //     }
        // }

        // if(sameBank == true){
        //     //sender update

        //     for(let s = 0; s < localData.length; s++){
        //         if(profname == localData[s].accountnumber){
        //             localData[s].balance = transferUpdateSender
        //             {break}
        //         }
        //     }

        //     //Receiver

        //     for(let r = 0; r < localData.length; r++){
        //         if(receiverAccountNumber == localData[r].accountnumber){
        //             localData[r].balance = transferUpdateReceiver
        //             {break}
        //         }
        //     }
        //     console.log(`Sender Update: ${transferUpdateSender} \n Receiver Update: ${transferUpdateReceiver}`)
            
        //     // localStorage.setItem('allAccounts', JSON.stringify(localData))
        //     // saveHistory(txntype,currentUser,newAmount,destaccount,transferUpdateSender)
        //     const modalMessage = `Transfer successful: Php ${newAmount} to account of ${destaccount}`
        //     setNewAmount('')
        //     setTxnResponse(modalMessage)
        //     setModalOpen(true)
        // }else{
        //     for(let s = 0; s < localData.length; s++){
        //         if(profname == localData[s].accountnumber){
        //             localData[s].balance = transferUpdateSender
        //             {break}
        //         }
        //     }
        //     // localStorage.setItem('allAccounts', JSON.stringify(localData))
        //     // saveHistory(txntype,currentUser,newAmount,destaccount,transferUpdateSender)
        //     const modalMessage = `Transfer successful: Php ${newAmount} to account of ${destaccount}`
        //     setNewAmount('')
        //     setTxnResponse(modalMessage)
        //     setModalOpen(true)
        // }



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
                            <form id="form_deposit" >                                
                                <div className="input-group spacing">
                                    <label> Amount </label>
                                    <input type="number" name="newamount"  value={newAmount} onChange={handleNewAmount} min="0"/>

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
                                    {/* <button onClick={handleTransfer}>
                                        <i className="ion-android-checkmark-circle"></i>
                                        &nbsp;
                                        Transfer
                                    </button> */}
                                </div>
                                <div className="input-group">                                                  
                                    <div className="input-group spacing">
                                        <label> Receiver Account </label>
                                        <input type="number" name="newamount" min="0" onChange={handleReceiver} />
                                    </div>
                                    <button onClick={handleTransfer}>
                                        <i className="ion-android-checkmark-circle"></i>
                                        &nbsp;
                                        Transfer
                                    </button>
                                    {/* <div className="input-group">
                                        <button type="submit">
                                            <i className="ion-android-checkmark-circle"></i>
                                            &nbsp;
                                            Show Account
                                        </button>
                                    </div> */}
                                    <br />
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