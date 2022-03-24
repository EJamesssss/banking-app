import React from "react";
import update from "../assets/images/update.png";
import remove from "../assets/images/remove.png";
import "../App.css";

const ReadOnlyRows = ({ user }) => {
    return(
        <tr>
            <td>{user.name}</td>
            <td>{user.accountnumber}</td>
            <td>{user.balance}</td>
            <td>
                <span>
                    <img className="img_size" src={update} />
                </span>
                &nbsp;
                <span>
                    <img className="img_size" src={remove} />
                </span>
            </td>
        </tr>
    )
}
export default ReadOnlyRows