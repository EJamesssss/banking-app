import React, {useState} from "react";
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
        localStorage.setItem("fullname", name)
        localStorage.setItem("Balance", bal)
        
    }

    

    return(
        <div>
            <form onSubmit={handleClick}>
            <label> Full Name:</label>
            <input name="fullname" value={name} onChange={handleChangeName} />
            <label> Balance:</label>
            <input name="balance" value={bal} onChange={handleChangeBalance} />
            <button type="submit">Register User</button>
            </form>
            <p>Name: {localStorage.getItem("fullname")}</p>
            <p>Balance: {localStorage.getItem("Balance")}</p>
        </div>
    )
}

export default AddNewUser