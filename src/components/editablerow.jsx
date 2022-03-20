import React from "react";

const EditableRows = ({editUserData, handleEditClick}) =>{
    return(
        <tr>
            <td>
                <input type="text" 
                required="required" 
                placeholder="Enter a name" 
                name="fullname"
                onChange={handleEditClick}
                value={editUserData.name} />
                
            </td>
            <td>
                <input type="number" 
                required="required" 
                placeholder="Enter a account number" 
                name="accountnumber"
                onChange={handleEditClick}
                value={editUserData.accountnumber} />
            </td>
            <td>
                <input type="number" 
                required="required" 
                placeholder="Enter an amount" 
                name="balance"
                onChange={handleEditClick}
                value={editUserData.balance} />
            </td>
            <td>
                <button type="submit">Save</button>
            </td>
        </tr>
    )
}

export default EditableRows