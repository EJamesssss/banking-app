import React, {useState} from "react";
import "../App.css";
import piggyBank from "../assets/images/piggybank.gif";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

const AdminRegistration = () => {
    return(
        <section id="view_initial">
            <nav>
                <img src={logo} />
                <h1>
                    PiggyBank<span>.</span>
                </h1>
                <ul className="nav-options">
                    
                    <Link to="usersreg"><li className="active-nav" data-view="register">Register</li></Link>
                    <Link to="/"><li data-view="login" >Login</li></Link>
                    {/* <li className="active-nav" data-view="login" >Login</li> */}
                </ul>
            </nav>
            <div>
                <article className="view_initial_nav">
                    <div className="view_initial_nav_dynamic">
                        <div id="dynamic_register" data-view="register">
                            <form id="form_register" className="registrationWrapper">
                                <div className="input-group">
                                    <label> Username</label>
                                    <input type='text' name="fullname" required="required" />
                                </div>
                                <div className="input-group">
                                    <label> Password </label>
                                    <input type='password' name="balance" required="required" />
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
export default AdminRegistration