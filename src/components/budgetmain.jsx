import React,{useState} from "react";
import { Link, useParams } from "react-router-dom";
import DisplayHistoryTable from "./historytable";
import "../App.css";
import user from "../assets/images/user.png";
import logo from "../assets/images/logo.png";

const BudgetMain = () => {
    const localData = JSON.parse(localStorage.getItem('allAccounts'))
    const localHistory = JSON.parse(localStorage.getItem('trxhistory'))
    let records = []

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



    return(
        <section id="view_loggedin">
            <nav>
                <img src={logo} />
                <ul className="nav-options">
                    <li className="active-nav" data-view="register">Dashboard</li>
                    <Link to={expenseapp}><li data-view="expense">Expense</li></Link>
                    <Link to="/"><li data-view="login" >Logout</li></Link>
                </ul>
            </nav>
            <div>
                <article className="view_usercard">
                    <div className="wrapper">
                        <p>Budget app</p>
                        <div className="user_informations">
                            <img id="user_avatar" src={user} alt="user" />
                            <div className="user_meta_container">
                                <p>{currentUser}</p>
                                <p>account number: {profname}</p>
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
            </div>
        </section>
    )
}

export default BudgetMain