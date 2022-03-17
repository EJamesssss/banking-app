import React from "react";
import { Link, Outlet } from "react-router-dom";



const NavBar = () => {

    return(
        <div>
            <nav>
                <a href="dashboard">Dashboard</a>
                <a href="adduser">Add user</a>
            </nav>
            <Outlet />
        </div>
    )

}

export default NavBar