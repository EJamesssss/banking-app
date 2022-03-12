import React, { Component, useState } from "react";
import { render } from "react-dom";
import "../App.css";

const LoginUser = (props) => {
    const [name, setName] = useState(props.name)
    const [pass, setPass] = useState(props.pass)

    const handleClick = (e) => {
        setName = ("asdasd")
    }

    return(
        <section id="view_initial">
            <nav>
                <img src="/public/images/bank-icon.svg" />
                <ul class="nav-options">
                    <li data-view="home">Home</li>
                    <li data-view="register">Register</li>
                    <li class="active-nav" data-view="login">Login</li>
                </ul>
            </nav>
            <div>
                <article class="view_initial_img">
                    <h1>
                        InBank<span>.</span>
                    </h1>
                    <p>Your in-browser memory bank!</p>
                    <img src="/public/images/bank.gif" alt="InBank" />
                </article>
                <article class="view_initial_nav">
                    <div class="view_initial_nav_dynamic">
                        <div id="dynamic_login" data-view="login">
                            <form id="form_login" onSubmit={handleClick}>
                                <div class="input-group">
                                    <label> Full Name: {name}</label>
                                    <input type='text' value={name} onSubmit={e => setName(e.target.value)} />
                                </div>

                                <div class="input-group">
                                    <label> Password: {pass}</label>
                                    <input type='password' value={pass} onSubmit={e => setPass(e.target.value)} />
                                </div>
                                
                                <div class="input-group">
                                    <button type="submit">
                                        <i class="ion-android-checkmark-circle"></i>
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

export default LoginUser