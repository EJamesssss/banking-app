import React, {useState} from "react";
import { render } from "react-dom";
import "../App.css";
import logo from "../assets/images/logo.png";
import piggyBank from "../assets/images/piggybank.gif";

// export default class RegisterUser extends Component{
//     state = {
//         fullname: "",
//         balance: 0
//     };

//     handleChange = (e) => {
//         const input = e.target
//         const value = e.target

//         this.setState({[input.name]: value,[input.bal]: value})
//     }

//     handleFormSubmit = () => {
//         const {fullname, balance} = this.state;
//         localStorage.setItem('fullname', fullname)
//         localStorage.setItem('balance', balance)
//     }

//     render() {
//         return (
//             <form onSubmit={this.handleFormSubmit}>
//                 <label>
//                     Fullname: <input name="fullname" value={this.state.fullname} onChange={this.handleChange}/>
//                 </label>
//                 <label>
//                     Amount: <input name="balance" value={this.state.balance} onChange={this.handleChange}/>
//                 </label>
//                 <button type="submit">Create account</button>
//             </form>
//         );
//     }
// }

const AddNewUser = () => {

    const [name, setName] = useState('')
    const [bal, setBal] = useState('')

    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const handleChangeBalance = (e) => {
        setBal(e.target.value)
    }

    const handleClick = (e) => {
        // e.preventDefault()

        let userData = {
            "name": name,
            "balance": bal
        }

        if(localStorage.getItem('allAccounts') == null){
            localStorage.setItem('allAccounts',JSON.stringify([]))
        }

        var oldData = JSON.parse(localStorage.getItem('allAccounts'))
        oldData.push(userData)

        localStorage.setItem('allAccounts', JSON.stringify(oldData))
    }

    

    return(
        <section id="view_initial">
           <nav>
                <img src={logo} />
                <ul class="nav-options">
                    <li class="active-nav" data-view="register">Register</li>
                    <li data-view="login">Login</li>
                </ul>
            </nav>
            <div>
                <article class="view_initial_img">
                    <h1>
                        PiggyBank<span>.</span>
                    </h1>
                    <p>Your in-browser memory bank!</p>
                    <img src={piggyBank} alt="PiggyBank" />
                </article>
                <article class="view_initial_nav">
                    <div class="view_initial_nav_dynamic">
                        <div id="dynamic_register" data-view="register">
                            <form id="form_register" onSubmit={handleClick}>
                                <div class="input-group">
                                    <label> Full Name:</label>
                                    <input type='text' name="fullname" value={name} onChange={handleChangeName} />
                                </div>
                                <div class="input-group">
                                    <label> Balance:</label>
                                    <input type='number' name="balance" value={bal} onChange={handleChangeBalance} />
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

export default AddNewUser