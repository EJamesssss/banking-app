import React, {useState} from "react";
import Dropdown from "react-dropdown";
import 'react-dropdown/style.css';

const UserDashboard = () => {
    let storageData = JSON.parse(localStorage.getItem('allAccounts'))
    // console.log(storageData)

    let [acctName, setAcctName] = useState('Select an Account')
    let [acctAmount, setAcctAmount] = useState('')



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

    return(
        <div className="accountNames">
            <form onSubmit={handleOpenDetails}>
            <select onChange={handleSelectedAccount}>
                <option value='Select an account'> -- Select An Account --</option>
                {storageData.map((acctName) =>  <option key={acctName.name} value={acctName.value}>{acctName.name}</option>)}
            </select>
            <button type="submit">Register User</button>
            </form>
            <br />
            {acctAmount}
        </div>
    )
}

export default UserDashboard
