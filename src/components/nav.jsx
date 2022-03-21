import React from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "../App.css";



const NavBar = () => {

    return(
        <section id="view_loggedin">
            <nav>
                <div className="nav-brand">
                    <img src={logo} />
                    <h1>
                        PiggyBank<span>.</span>
                    </h1>
                </div>
                <ul className="nav-options">
                    <Link to=""><li> Dashboard </li></Link>
                    <Link to="adduser"><li> Add User </li></Link>
                    <Link to="users"><li> Show Users </li></Link> 
                    <li>Logout</li>
                </ul> 
            </nav>
            <Outlet />
        </section>
    )

}

export default NavBar