import React,{useState} from "react";
import { useParams } from "react-router-dom";
import DisplayHistoryTable from "./historytable";
import "../App.css";
import user from "../assets/images/user.png";
import logo from "../assets/images/logo.png";

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
        <section id="view_loggedin">
            <nav>
                <img src={logo} />
                <ul className="nav-options">
                    <li className="active-nav" data-view="register">Dashboard</li>
                    <li data-view="login" >Login</li>
                </ul>
            </nav>
            <div>
                <article className="view_usercard">
                    <div className="wrapper">
                        <p>Budget app</p>
                        <div className="user_informations">
                            <img id="user_avatar" src={user} alt="user" />
                            <div className="user_meta_container">
                                <p>{profname} Here</p>
                                <p>account number here: {accountNum}</p>
                            </div>
                        </div>
                        <div>
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
                    </div>
                </article>
            </div>
        </section>
    )
}

export default BudgetMain