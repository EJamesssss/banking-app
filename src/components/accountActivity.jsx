import React, {useState} from "react";
import "../App.css";
import logo from "../assets/images/logo.png";
import edit from "../assets/images/edit.png";
import user from "../assets/images/user.png";

const UserDashboard = () => {
    let storageData = JSON.parse(localStorage.getItem('allAccounts'))
    // console.log(storageData)

    let [acctName, setAcctName] = useState(' --- ')
    let [acctAmount, setAcctAmount] = useState('')
    let [newAmount, setNewAmount] = useState('')
    let [receiverAccount, setReceiverAccount] = useState('Select an Account')
    let [receiverAmount, setReceiverAmount] = useState('')



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
            }
        }

    }

    let handleOpenReceiverAccount = (e) => {
        e.preventDefault()

        for(let r = 0;r < storageData.length;r++){{
            if(receiverAccount == storageData[r].name){
                setReceiverAmount(storageData[r].balance)
            }
        }}
    }

    let handleNewAmount = (e) => {
        setNewAmount(e.target.value)
    }

    let handleWithdraw = (e) => {
        e.preventDefault()
        var existingAmount = parseInt(acctAmount)
        var newAmountInt = parseInt(newAmount)

        var updatedAmount = (existingAmount - newAmount).toString()

        for(let w = 0; w < localStorage.length; w++){
            if(acctName == storageData[w].name){
                storageData[w].balance = updatedAmount
            }
        }
        localStorage.setItem('allAccounts', JSON.stringify(storageData))
    }

    let handleDeposit = (e) => {
        e.preventDefault()
        var existingAmountDeposit = parseInt(acctAmount)
        var newAmountDeposit = parseInt(newAmount)

        const updateDeposit = (existingAmountDeposit + newAmountDeposit).toString()

        for(let d = 0; d < localStorage.length; d++){
            if(acctName == storageData[d].name){
                storageData[d].balance = updateDeposit
            }
        }
        localStorage.setItem('allAccounts', JSON.stringify(storageData))
    }

    let handleTransfer = (e) => {
        e.preventDefault()
        var transferAmount = parseInt(newAmount)
        var senderAccount = parseInt(acctAmount)
        var recAccount = parseInt(receiverAmount)

        //Sender Account
        const deductSender = (senderAccount - transferAmount).toString()

        for(let sender = 0; sender < storageData.length;sender++){
            if(acctName == storageData[sender].name){
                storageData[sender].balance = deductSender
            }
        }

        //Receiver Account
        const addReceiver = (recAccount + transferAmount).toString()
        for(let rec = 0;rec < storageData.length;rec++){
            if(receiverAccount == storageData[rec].name){
                storageData[rec].balance = addReceiver
            }
        }

        localStorage.setItem('allAccounts',JSON.stringify(storageData))

    }

    return(
        <section id="view_loggedin">
            <nav>
                <div class="nav-brand">
                    <img src={logo} />
                    <h1>
                        PiggyBank<span>.</span>
                    </h1>
                </div>
                <ul class="nav-options">
                    <li id="editaccount">
                        <img src={edit} title="Edit Account" />
                    </li>
                    <li id="logout">Logout</li>
                </ul>
            </nav>
            <div>
                <article class="view_usercard">
                    <div class="wrapper">
                        <div class="user_informations">
                            <img id="user_avatar" src={user} alt="user" />
                            <div class="user_meta_container">
                                <h1 id="user_name">
                                    <span id="name">{acctName}</span>
                                </h1>
                                <p id="user_accountcreation">Mon Mar 14, 2022</p>
                                <p id="user_accountnumber">
                                    <span>Account Number: &nbsp; <i class="ion-card"></i></span>
                                    <span id="accountnumber">1234567890</span>
                                </p>
                                <p id="user_balance">
                                    <span>PHP &nbsp;</span>
                                    <span id='balance'>{acctAmount}</span>
                                </p>
                            </div>
                        </div>

                        <div class="user_informations2">
                            <form onSubmit={handleOpenAccountDetails}>
                                    <label> User Account </label>
                                    <select  class="accountNames" onChange={handleSelectedAccount}>
                                        <option value=' '> -- Select An Account --</option>
                                            { storageData.map((acctName) =>  
                                                <option key={acctName.name} value={acctName.value}>{acctName.name}</option>)}
                                    </select>
                                    <button class="asdf" type="submit">
                                        <i class="ion-android-checkmark-circle"></i>
                                        &nbsp;
                                        Show Account
                                    </button>
                            </form>
                        </div>
                    </div>
                </article>
                <article class="view_useractions">
                    <div class="wrapper view_useractions_parent">
                        <div id="dynamic_deposit" data-action="deposit">
                            <form id="form_deposit" onSubmit={handleOpenReceiverAccount}>                                
                                <div class="input-group">
                                    <label> Deposit Amount </label>
                                    <input type="number" name="newamount" value={newAmount} onChange={handleNewAmount} />
                                </div>
                                <div class="input-group">
                                    <button onClick={handleWithdraw}>
                                        <i class="ion-android-checkmark-circle"></i>
                                        &nbsp;
                                        Withdraw
                                    </button>
                                    <button onClick={handleDeposit}>
                                        <i class="ion-android-checkmark-circle"></i>
                                        &nbsp;
                                        Deposit
                                    </button>
                                    <button onClick={handleTransfer}>
                                        <i class="ion-android-checkmark-circle"></i>
                                        &nbsp;
                                        Transfer
                                    </button>
                                                    
                                    <div class="input-group spacing">
                                        <label> Receiver Account </label>
                                        <select onChange={handleReceiverAccount}>
                                            <option value='Select an account'> -- Select An Account --</option>
                                                { storageData.map((receiverAccount) =>  
                                                    <option key={receiverAccount.name} value={receiverAccount.value}>{receiverAccount.name}</option>)}
                                        </select>
                                    </div>
                                    <div class="input-group">
                                        <button type="submit">
                                            <i class="ion-android-checkmark-circle"></i>
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
