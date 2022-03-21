import React from "react";

const ReadOnlyRows = ({ user }) => {
    return(
        <tr>
            <td>{user.name}</td>
            <td>{user.accountnumber}</td>
            <td>{user.balance}</td>
        </tr>
    )
}
export default ReadOnlyRows