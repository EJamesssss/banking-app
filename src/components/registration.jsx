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
        <div>
            <p>Open New Bank Account</p>
            <form onSubmit={handleClick}>
            <label> Full Name:</label>
            <input name="fullname" value={name} onChange={handleChangeName} />
            <label> Balance:</label>
            <input name="balance" value={bal} onChange={handleChangeBalance} />
            <button type="submit">Register User</button>
            </form>
        </div>
    )
}

export default AddNewUser