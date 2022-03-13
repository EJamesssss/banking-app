import React, {useState} from "react";

const UserDashboard = () => {
    let storageData = JSON.parse(localStorage.getItem('allAccounts'))
    // console.log(storageData)

    let [acctName, setAcctName] = useState('Select an Account')
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
        <div className="accountNames">
            <form onSubmit={handleOpenAccountDetails}>
                <p>User Account</p>
            <select onChange={handleSelectedAccount}>
                <option value='Select an account'> -- Select An Account --</option>
                {storageData.map((acctName) =>  <option key={acctName.name} value={acctName.value}>{acctName.name}</option>)}
            </select>
            <button type="submit">Show Account</button>
            </form>
            <br />
            <p>Php: {acctAmount}</p>
            <br />
            <form>
            <label> Enter Amount: </label>
            <input name="newamount" value={newAmount} onChange={handleNewAmount} />
            <br />
            <button onClick={handleWithdraw}>Withdraw</button>
            <button onClick={handleDeposit}>Deposit</button>
            <button onClick={handleTransfer}>Transfer</button>
            </form>
            <form onSubmit={handleOpenReceiverAccount}>
                <p>Receiver Account</p>
            <select onChange={handleReceiverAccount}>
                <option value='Select an account'> -- Select An Account --</option>
                {storageData.map((receiverAccount) =>  <option key={receiverAccount.name} value={receiverAccount.value}>{receiverAccount.name}</option>)}
            </select>
            <button type="submit">Show Account</button>
            </form>
            <br />
            <p>Php: {receiverAmount}</p>
        </div>
    )
}

export default UserDashboard
