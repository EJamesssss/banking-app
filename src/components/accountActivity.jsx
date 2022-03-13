import React, {useState} from "react";
import Dropdown from "react-dropdown";
import 'react-dropdown/style.css';

const UserDashboard = () => {
    let storageData = JSON.parse(localStorage.getItem('allAccounts'))
    console.log(storageData)

    let [acctName, setAcctName] = useState('Select an Account')

    let handleSelectedAccount = (e) => {
        setAcctName(e.target.value)
    }

    return(
        <div className="accountNames">
            {acctName}
            <br />

            <select onChange={handleSelectedAccount}>
                <option value='Select an account'> -- Select An Account --</option>
                {storageData.map((acctName) =>  <option key={acctName.name} value={acctName.value}>{acctName.name}</option>)}
            </select>
        </div>
    )
}

export default UserDashboard
