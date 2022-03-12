import React, { Component, useState } from "react";
import { render } from "react-dom";

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

const AddNewUser = (props) => {
    const [name, setName] = useState(props.name)
    const [bal, setBal] = useState(props.bal)

    const handleClick = (e) => {
        setName = ("asdasd")
        
    }

    return(
        <div>
            <form onSubmit={handleClick}>
            <label> Full Name: {name}</label>
            <input value={name} onSubmit={e => setName(e.target.value)} />
            <label> Balance: {bal}</label>
            <input value={bal} onSubmit={e => setBal(e.target.value)} />
            <button type="submit">Register User</button>
            </form>
        </div>
    )
}

export default AddNewUser