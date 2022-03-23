import React, {useState} from "react";
import "../App.css";
import piggyBank from "../assets/images/piggybank.gif";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";


const UserRegistration = () => {

    const [uname, setUname] = useState('')
    const [accnum, setAccNum] = useState('')
    const [pword,setPword] = useState('')

    const handleUname = (e) => {
        setUname(e.target.value)
    }

    const handleAccNum = (e) => {
        setAccNum(e.target.value)
    }
    const handlePword = (e) => {
        setPword(e.target.value)
    }

    const handleRegisterUser = (e) => {
        e.preventDefault()

        let consumerAccount = {
            username: uname,
            password: pword,
            accountnum: accnum,
            role: 'user'
        }

        if(localStorage.getItem('customeraccounts') == null){
            localStorage.setItem('customeraccounts',JSON.stringify([]))
        }

        const localAccounts = JSON.parse(localStorage.getItem('customeraccounts'))
        const bankaccounts = JSON.parse(localStorage.getItem('allAccounts'))

        let usernamechecker = 'passed'
        let accountnumberchecker = ''

        if(localAccounts.length == 0){
            usernamechecker = 'passed'
            for (let ac = 0; ac < bankaccounts.length; ac ++){
                if(accnum == bankaccounts[ac].accountnumber){
                    accountnumberchecker = 'passed'
                    {break}
                }
            }
        }else{
            for(let ba = 0; ba < bankaccounts.length; ba++){
                if(accnum == bankaccounts[ba].accountnumber){
                    accountnumberchecker = 'passed'
                    {break}
                }
            }
            for(let cu = 0; cu <localAccounts.length; cu++){
                if (uname == localAccounts[cu].username){
                    usernamechecker = ''
                    {break}
                }
            }
        }

        if(usernamechecker == ''){
            alert(`Registration failed! username already exist`)
        }else if(accountnumberchecker == ''){
            alert(`Registration failed! Account number doesn't exist`)
        }else{
            localAccounts.push(consumerAccount)
            localStorage.setItem('customeraccounts',JSON.stringify(localAccounts))
            alert(`Registration successful!`)
            setAccNum('')
            setPword('')
            setUname('')
        }
    }

    return(
        <section id="view_initial">
            <nav>
                <img src={logo} />
                <ul className="nav-options">
                    
                    <Link to="usersreg"><li className="active-nav" data-view="register">Register</li></Link>
                    <Link to="/"><li data-view="login" >Login</li></Link>
                    {/* <li className="active-nav" data-view="login" >Login</li> */}
                </ul>
            </nav>
            <div>
                <article className="view_initial_img">
                    <h1>
                        PiggyBank<span>.</span>
                    </h1>
                    <img src={piggyBank} alt="PiggyBank" />
                </article>
                <article className="view_initial_nav">
                    <div className="view_initial_nav_dynamic">
                        <div id="dynamic_register" data-view="register">
                            <form id="form_register" onSubmit={handleRegisterUser}>
                                <div className="input-group">
                                    <label> Username</label>
                                    <input type='text' name="fullname" required="required" onChange={handleUname} />
                                </div>
                                <div className="input-group">
                                    <label> Account Number</label>
                                    <input type='number' name="fullname" required="required" onChange={handleAccNum} />
                                </div>
                                <div className="input-group">
                                    <label> Password </label>
                                    <input type='password' name="balance" required="required" onChange={handlePword} />
                                </div>
                                <div className="input-group">
                                    <button type="submit">
                                        <i className="ion-android-checkmark-circle"></i>
                                        &nbsp;
                                        Register User
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    )
}

export default UserRegistration