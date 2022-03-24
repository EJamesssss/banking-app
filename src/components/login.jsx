import React, { Component, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { render } from "react-dom";
import "../App.css";
import logo from "../assets/images/logo.png";
import piggyBank from "../assets/images/piggybank.gif";

const LoginUser = () => {
  const navigate = useNavigate();
  const getaccounts = JSON.parse(localStorage.getItem("customeraccounts"));
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  // const [useraccountnum, setUserAccountNum] = useState("");
  // const [role, setRole] = useState("");
  // const [isregistered, setIsRegistered] = useState(false);



  const handleClick = (e) => {
    setName(e.target.value);
  };

  const handlePass = (e) => {
    setPass(e.target.value);
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    let accountnum = ''
    let userrole = ''
    let accountowner = ''
    let isRegistered = false

    // if(name == 'admin'){
    //   navigate('/admin')
    // }else if(name == '214976'){
    //   navigate('profile/'+ name)
    // }else{
    //   alert(`${name} is not registered`)
    // }

    const userstorage = JSON.parse(localStorage.getItem('customeraccounts'))
    const bankstorage = JSON.parse(localStorage.getItem('allAccounts'))

    for(let un = 0; un < userstorage.length; un++){
      if(name === userstorage[un].username && pass === userstorage[un].password){
        // setUserAccountNum(userstorage[un].accountnum)
        accountnum = userstorage[un].accountnum
        userrole = userstorage[un].role
        isRegistered = true
        alert(`Account number: ${accountnum} \n Role: ${userrole}`)
        {break}
      }
    }

    if(isRegistered){
      if(userrole === 'admin'){
        navigate('/admin')
      }else if(userrole === 'user'){
        navigate('/budgetapp/'+accountnum)
      }
    }else{
      alert(`Log in failed! Please check your Username and Password`)
    }

  };

  return (
    <section id="view_initial">
      <nav>
        <img src={logo} />
        <ul className="nav-options">
          <Link to="usersreg">
            <li data-view="register">Register</li>
          </Link>
          {/* <Link to={} style={{ textDecoration: "none" }}>
            <li className="active-nav" data-view="login">
              Login
            </li>
          </Link> */}
          <li className="active-nav" data-view="login" >Login</li>
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
              <form id="form_login" onSubmit={handleLogIn}>
                <div className="input-group">
                  <label> Username:</label>
                  <input type="text" onChange={handleClick} />
                </div>

                <div className="input-group">
                  <label> Password:</label>
                  <input type="password" onChange={handlePass} />
                </div>

                <div className="input-group">
                  <button type="submit">
                    <i className="ion-android-checkmark-circle"></i>
                    &nbsp; Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default LoginUser;
