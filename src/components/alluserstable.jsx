import React, {useState, Fragment} from "react";
import ReadOnlyRows from './readrows'
import "../App.css";


const AllUsers = () => {
    var userData = JSON.parse(localStorage.getItem('allAccounts'))

    const [userList, setUserList] = useState(userData)


    return(
        <div className="tableWrapper">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Account Number</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.map((user) =>(
                        <ReadOnlyRows user={user}/>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AllUsers