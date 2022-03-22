import React from "react";

const DisplayHistoryTable = ({ rec }) => {
    return(
        <tr>
            <td>{rec.date}</td>
            <td>{rec.type}</td>
            <td>{rec.sourceaccount}</td>
            <td>{rec.trxAmount}</td>
            <td>{rec.destinationaccount}</td>
            <td>{rec.remainingbalance}</td>
        </tr>
    )
}
export default DisplayHistoryTable