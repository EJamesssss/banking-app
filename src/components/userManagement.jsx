import React, { useState } from "react";

const UserManagement = () => {
  const localstoragedata = JSON.parse(localStorage.getItem("alluserdata"));
  const generateAcctnumber = Math.floor(100000 + Math.random() * 900000);

  const [fullName, setFullName] = useState("");
  const [acctNumber, setAcctNumber] = useState(generateAcctnumber);
  const [newBal, setNewBal] = useState("");
  const [users, setUsers] = useState([])


  const adduser = () => {
      const newUser = {id: users.length, fullName,acctNumber,newBal}
      setUsers([...users, newUser])
  }

  const handleInputChange = (callback, value) => {
    callback(value);
  };

  return (
    <div>
      <div className="userForms">
        <form onSubmit={adduser}>
          <label htmlFor="fullname"> Full Name: </label>
          <input 
            type="text" 
            name="fullname" 
            id="fullname" 
            onChange={(e) => handleInputChange(setFullName, e.target.value)}
            />
          <label htmlFor="accountnumber"> Account Number: </label>
          <input
            type="text"
            name="accountnumber"
            id="accountnumber"
            value={acctNumber}
          />
          <label htmlFor="accountbalance"> Amount: </label>
          <input 
            type="text" 
            name="accountnumber" 
            id="accountnumber" 
            onChange={(e) => handleInputChange(setNewBal, e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
      </div>

      <div className="userlist-container">
        <h3>user list</h3>
        <ul>
          {localstoragedata.map(({ id, fullname, accountnumber, balance }) => {
            return (
              <li key={id}>
                <span>{id}</span>
                <span>{fullname}</span>
                <span>{accountnumber}</span>
                <span>{balance}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default UserManagement;
