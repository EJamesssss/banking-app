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
                                    <span id='balance'></span>
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
                            <form id="form_deposit">                                
                                <div className="input-group"> 
                                    <div className="input-group spacing">
                                        <label> User Account </label>
                                        <select>
                                            <option value=' '> -- Select An Account --</option>
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
                            <form id="form_deposit">                                
                                <div className="input-group spacing">
                                    <label> Amount </label>
                                    <input type="number" name="newamount" />

                                    <button>
                                        <i className="ion-android-checkmark-circle"></i>
                                        &nbsp;
                                        Withdraw
                                    </button>
                                    <button>
                                        <i className="ion-android-checkmark-circle"></i>
                                        &nbsp;
                                        Deposit
                                    </button>
                                    <button>
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
        </section>
    )
}

export default BudgetMain