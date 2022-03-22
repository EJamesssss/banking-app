import React,{useState} from "react";
import { useParams } from "react-router-dom";
import DisplayHistoryTable from "./historytable";

const BudgetMain = () => {
    const localData = JSON.parse(localStorage.getItem('allAccounts'))
    const localHistory = JSON.parse(localStorage.getItem('trxhistory'))
    let accountNum = ''
    let records = []

    const { profname } = useParams()
    // const [accountnum, setAccountNum] = useState('')

    for(let l = 0;l<localData.length; l++){
        if(localData[l].name == profname){
            accountNum = localData[l].accountnumber
        }
    }

    const gatherhistory =() => {
        for(let h = 0; h < localHistory.length; h++){
            if(localHistory[h].sourceaccount == profname){
                records.push(localHistory[h])
            }
        }
    }

    gatherhistory()



    return(
        <div>
            <p>Budget app</p>
            <div className="profile-area">
                <p>{profname} Here</p>
                <p>account number here: {accountNum}</p>
            </div>
            <div className="tablehistory">
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
    )
}

export default BudgetMain