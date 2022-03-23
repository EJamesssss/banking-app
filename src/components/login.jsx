import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import { render } from "react-dom";
import "../App.css";
import logo from "../assets/images/logo.png";
import piggyBank from "../assets/images/piggybank.gif";

const LoginUser = () => {

    const localData = JSON.parse(localStorage.getItem('allAccounts'))
    const [name, setName] = useState('')
    const [pass, setPass] = useState('')

    const profilelink = "budgetapp/" + name

    const handleClick = (e) => {
        setName(e.target.value)
    }

    const handlePass = (e) => {
        setPass(e.target.value)
    }


    console.log(localData)


    return(
        <section id="view_initial">
            <nav>
                <img src={logo} />
                <ul className="nav-options">
                    <Link to="usersreg"><li data-view="register">Register</li></Link>
                    <Link to={profilelink} style={{textDecoration: 'none'}}><li className="active-nav" data-view="login" >Login</li></Link>
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
                        <div id="dynamic_login" data-view="login">
                            <form id="form_login" onSubmit={handleClick}>
                                <div className="input-group">
                                    <label> Full Name:</label>
                                    <input type='text'  onChange={handleClick} />
                                </div>

                                <div className="input-group">
                                    <label> Password:</label>
                                    <input type='password' value={pass} onChange={handlePass} />
                                </div>
                                
                                <div className="input-group">
                                    <button type="submit">
                                        <i className="ion-android-checkmark-circle"></i>
                                        &nbsp;
                                        Login
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

export default LoginUser