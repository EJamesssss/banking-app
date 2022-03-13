import React, {useState} from "react";
import Dropdown from "react-dropdown";
import 'react-dropdown/style.css';

const UserDashboard = () => {
    let storageData = JSON.parse(localStorage.getItem('allAccounts'))
    // console.log(storageData)

    let [acctName, setAcctName] = useState('Select an Account')
    let [acctAmount, setAcctAmount] = useState('')
    let [newAmount, setNewAmount] = useState('')



    let handleSelectedAccount = (e) => {
        setAcctName(e.target.value)
    }

    let handleOpenDetails = (e) => {
        e.preventDefault()

        for(let actDet = 0;actDet < storageData.length;actDet++){
            if(acctName == storageData[actDet].name){
                setAcctAmount(storageData[actDet].balance)
            }
        }

    }

    let handleNewAmount = (e) => {
        setNewAmount(e.target.value)
    }

    let handleWithdraw = (e) => {
        e.preventDefault()
        var existingAmount = parseInt(acctAmount)
        var newAmountInt = parseInt(newAmount)

        var updatedAmount = (existingAmount - newAmount).toString()

        for(let i = 0; i < localStorage.length; i++){
            if(acctName == storageData[i].name){
                storageData[i].balance = updatedAmount
            }
        }
        localStorage.setItem('allAccounts', JSON.stringify(storageData))
    }

    return(
        <div className="accountNames">
            <form onSubmit={handleOpenDetails}>
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
            </form>
        </div>
    )
}

export default UserDashboard
