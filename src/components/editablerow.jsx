import React from "react";

const EditableRows = () =>{
    return(
        <tr>
            <td>
                <input type="text" 
                required="required" 
                placeholder="Enter a name" 
                name="fullname" />
            </td>
            <td>
                <input type="number" 
                required="required" 
                placeholder="Enter a account number" 
                name="accountnumber" />
            </td>
            <td>
                <input type="number" 
                required="required" 
                placeholder="Enter an amount" 
                name="balance" />
            </td>
        </tr>
    )
}

export default EditableRows