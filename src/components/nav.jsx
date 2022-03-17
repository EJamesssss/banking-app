import React from "react";
import { Link, Outlet } from "react-router-dom";



const NavBar = () => {

    return(
        <div>
            <nav>
                <Link to="dashboard">Dashboard</Link>
                <Link to="adduser">Add User</Link>
                <Link to="users">Show Users</Link>
            </nav>
            <Outlet />
        </div>
    )

}

export default NavBar