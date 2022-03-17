import React, {useState, Fragment} from "react";
import ReadOnlyRows from './readrows'
import EditableRows from "./editablerow";
import "../App.css";


const AllUsers = () => {
    var userData = JSON.parse(localStorage.getItem('allAccounts'))

    const [userList, setUserList] = useState(userData)
    const [editUserID, setEditUserID] = useState(null)

    const [editUserData,setEditUserData] = useState({
        "name": "",
        "balance": "",
        "accountnumber": ""
    })

    const handleEditClick = (e, user) => {
        e.preventDefault()
        setEditUserID(user.accountnumber)
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
                            {editUserID === user.accountnumber ? (<EditableRows />) : (<ReadOnlyRows user={user} handleEditClick={handleEditClick}/>)}
                        </Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AllUsers