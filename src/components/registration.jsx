import React, {useState} from "react";
import "../App.css";
import logo from "../assets/images/logo.png";
import piggyBank from "../assets/images/piggybank.gif";


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
        e.preventDefault()

        let acctNumber = Math.floor(100000 + Math.random() * 900000)

        let userData = {
            "name": name,
            "balance": bal,
            "accountnumber": acctNumber,
            "history": []
        }

        if(localStorage.getItem('allAccounts') == null){
            localStorage.setItem('allAccounts',JSON.stringify([]))
        }

        var oldData = JSON.parse(localStorage.getItem('allAccounts'))

        if(name === '' || name === null || bal === '' || bal === null){
            alert(`Please fill up all the needed data.`)
        }else{
            if(oldData.length === 0){
                oldData.push(userData)
                localStorage.setItem('allAccounts', JSON.stringify(oldData))
                alert(`You have successfully opened a bank account! \n Account Name: ${name}\n Account Number: ${acctNumber}\n Balance: ${bal}`)
                setName('')
                setBal('')
            }else{
                if(name === oldData.name){
                    alert(`Account name already in use`)
                }else{
                    oldData.push(userData)
                    localStorage.setItem('allAccounts', JSON.stringify(oldData))
                    alert(`You have successfully opened a bank account! \n Account Name: ${name}\n Account Number: ${acctNumber}\n Balance: ${bal}`)
                    setName('')
                    setBal('')
                }
            }
        }
    }

    

    return(
        <section id="view_initial">
            <div>
                <article className="view_initial_img">
                    <p>Small steps to a better future with</p>
                    <p><b>PiggyBank.</b></p>
                    <img src={piggyBank} alt="PiggyBank" />
                </article>
                <article className="view_initial_nav">
                    <div className="view_initial_nav_dynamic">
                        <div id="dynamic_register" data-view="register">
                            <form id="form_register" onSubmit={handleClick}>
                                <div className="input-group">
                                    <label> Full Name:</label>
                                    <input type='text' name="fullname" value={name} onChange={handleChangeName} />
                                </div>
                                <div className="input-group">
                                    <label> Balance:</label>
                                    <input type='number' name="balance" value={bal} onChange={handleChangeBalance} />
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

export default AddNewUser