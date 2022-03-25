import React, {useState} from "react";
import "../App.css";
import piggyBank from "../assets/images/piggybank.gif";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

const AdminRegistration = () => {
    const [adminuname, setAdminUname] = useState('')
    const [adminpword,setAdminPword] = useState('')

    const handleAdminUname = (e) => {
        setAdminUname(e.target.value)
    }

    const handleAdminPword = (e) => {
        setAdminPword(e.target.value)
    }

    const handleRegisterAdmin =(e) => {
        e.preventDefault()

        let RegisterAdmin = {
            username: adminuname,
            password: adminpword,
            accountnum: 0,
            role: 'admin'
        }

        if(localStorage.getItem('customeraccounts') == null){
            localStorage.setItem('customeraccounts',JSON.stringify([]))
        }

        const adminstorage = JSON.parse(localStorage.getItem('customeraccounts'))

        let usernamechecker = 'passed'

        if(adminstorage.length == 0){
            usernamechecker = 'passed'
        }else{
            for(let cu = 0; cu <adminstorage.length; cu++){
                if (adminuname == adminstorage[cu].username){
                    usernamechecker = ''
                    {break}
                }
            }
        }

        if(usernamechecker == ''){
            alert(`Registration failed! username already exist`)
        }else{
            adminstorage.push(RegisterAdmin)
            localStorage.setItem('customeraccounts',JSON.stringify(adminstorage))
            alert(`Registration successful!`)
            setAdminUname('')
            setAdminPword('')
        }
    }


    return(
        <section id="view_initial">
            <div>
                <article className="view_initial_nav">
                    <div className="view_initial_nav_dynamic">
                        <div id="dynamic_register" data-view="register">
                            <form id="form_register" className="registrationWrapper" onSubmit={handleRegisterAdmin}>
                                <div className="input-group">
                                    <label> Username</label>
                                    <input type='text' name="fullname" required="required" onChange={handleAdminUname}/>
                                </div>
                                <div className="input-group">
                                    <label> Password </label>
                                    <input type='password' name="balance" required="required" onChange={handleAdminPword} />
                                </div>
                                <div className="input-group">
                                    <button type="submit" >
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