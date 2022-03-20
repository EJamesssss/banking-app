import React, {useState, Fragment} from "react";
import ReadOnlyRows from './readrows'
import EditableRows from "./editablerow";
import "../App.css";


const AllUsers = () => {
    var userData = JSON.parse(localStorage.getItem('allAccounts'))

    const [userList, setUserList] = useState(userData)
    const [editUserID, setEditUserID] = useState(null)
    const [hist, setHistory] = useState([])

    const [editUserData,setEditUserData] = useState({
        "name": "",
        "balance": "",
        "accountnumber": "",
        "history": []
    })

    const handleEditClick = (e, user) => {
        e.preventDefault()
        setEditUserID(user.accountnumber)

        const formValues = {
            name: user.name,
            balance: user.balance,
            accountnumber: user.accountnumber,
            history: user.history
        }

        setEditUserData(formValues)
    }



    return(
        <div className="tableWrapper">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Account Number</th>
                        <th>Balance</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.map((user) =>(
                        <Fragment>
                            {editUserID === user.accountnumber ? (<EditableRows editUserData={editUserData} handleEditClick={handleEditClick} />) : (<ReadOnlyRows user={user} handleEditClick={handleEditClick}/>)}
                        </Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AllUsers