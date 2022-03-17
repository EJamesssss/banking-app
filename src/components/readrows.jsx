import React from "react";

const ReadOnlyRows = ({ user, handleEditClick }) => {
    return(
        <tr>
            <td>{user.name}</td>
            <td>{user.accountnumber}</td>
            <td>{user.balance}</td>
            <td>
                <button type="button" onClick={(e)=> handleEditClick(e, user)}>Edit</button>
            </td>
        </tr>
    )
}
export default ReadOnlyRows