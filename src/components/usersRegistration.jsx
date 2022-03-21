import React, {useState} from "react";
import "../App.css";
import piggyBank from "../assets/images/piggybank.gif";
import logo from "../assets/images/logo.png";


const UserRegistration = () => {

    return(
        <section id="view_initial">
            <nav>
                <img src={logo} />
                <ul className="nav-options">
                    <li className="active-nav" data-view="register">Register</li>
                    <li data-view="login" >Login</li>
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
                            <form id="form_register">
                                <div className="input-group">
                                    <label> Username</label>
                                    <input type='text' name="fullname" />
                                </div>
                                <div className="input-group">
                                    <label> Account Number</label>
                                    <input type='number' name="fullname" />
                                </div>
                                <div className="input-group">
                                    <label> Password </label>
                                    <input type='password' name="balance" />
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