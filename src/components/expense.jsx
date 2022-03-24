import React, {useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import "../App.css";
import logo from "../assets/images/logo.png";
import update from "../assets/images/update.png";
import remove from "../assets/images/remove.png";

const Expense = () => {

    const {profname} = useParams()

    if(localStorage.getItem('expenserecord') == null){
        localStorage.setItem('expenserecord',JSON.stringify([]))
    }

    const expenselocal = JSON.parse(localStorage.getItem('expenserecord'))
    const acctdetails = JSON.parse(localStorage.getItem('allAccounts'))

    let accountname = ''
    
    const [expense, setExpense] = useState(expenselocal)

    const [id, setId] = useState(0)
    const [expensename, setExpenseName] = useState('')
    const [cost, setCost] = useState('')

    const [isEditing, setIsEditing] = useState(false)
    const [isEditingId, setIsEditingId] = useState(0)

    for(let ad = 0; ad < acctdetails.length; ad++){
        if(profname == acctdetails[ad].accountnumber)
        accountname = acctdetails[ad].name
        {break}
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (isEditing) {
            editExpense(isEditingId)
            setIsEditing(false)
            return
        }
        addExpense()
        setIsEditing(false)
    }

    const handleInputChange = (callback, value) => {
        callback(value)
    }

    const handleDelete = (id) => {
        const newExpenses = expense.filter((exp) => exp.id != id)
        setExpense(newExpenses)
        localStorage.setItem('expenserecord', JSON.stringify(newExpenses))
    }

    const editExpense = (id) => {
        const selectedExp = expense.find(exp => exp.id == id)
        selectedExp.expensename = expensename
        selectedExp.cost = cost
        const updatedExp = expense.map((exp) =>
        exp.id === id ? { ...selectedExp } : exp
        )
        localStorage.setItem('expenserecord', JSON.stringify(updatedExp))
        resetInput()
    }

    const addExpense = () => {
        let lastID = 0
        if(expenselocal.length == 0){
            lastID = 0
        }else{
            let newID = ''
            for(let lid = 0; lid < expenselocal.length; lid++){
                newID = expenselocal[lid].id
            }

            lastID = parseInt(newID) + 1
        }
        const newExp = { id: lastID, accountnumber: profname, accountowner: accountname , expensename, cost }
        expense.push(newExp)
        console.log(`Account Number: ${profname} \n Account Owner: ${accountname}`)

        localStorage.setItem('expenserecord', JSON.stringify(expense))
        resetInput()
    }

    const resetInput = () => {
        setExpenseName('')
        setCost('')
    }

    const handleEdit = (id) => {
        setIsEditingId(id)
        setIsEditing(true)
        const selectedExp = expense.find((exp) => exp.id === id)
        setExpenseName(selectedExp.expensename)
        setCost(selectedExp.cost)
    }

    const dashboardlink = '/budgetapp/'+ profname

    return (
        <section id="view_loggedin">
            <nav>
                <img src={logo} />
                <h1>
                    PiggyBank<span>.</span>
                </h1>
                <ul className="nav-options">
                    <Link to={dashboardlink}><li data-view="register">Dashboard</li></Link>
                    <li className="active-nav" data-view="expense">Expense</li>
                    <Link to="/"><li data-view="login" >Logout</li></Link>
                </ul>
            </nav>
            <div className="view_expense">
                <article className="view_usercard">
                    <div className="wrapper">
                        <div className="user_informations tableScroll2">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Account #</th>
                                        <th>Account Name</th>
                                        <th>Expense Name</th>
                                        <th>Cost</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {expense.map(({id, accountnumber, accountowner , expensename, cost}) => {
                                        return (
                                            <tr key={id + expensename}>
                                                <td>{id}</td>
                                                <td>{accountnumber}</td>
                                                <td>{accountowner}</td>
                                                <td>{expensename}</td>
                                                <td>{cost}</td>
                                                <td>
                                                    <span onClick={() => handleEdit(id)}>
                                                        <img className="img_size" src={update} />
                                                    </span>
                                                    &nbsp;
                                                    <span onClick={ () => handleDelete(id)}>
                                                        <img className="img_size" src={remove} />
                                                    </span>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </article>
                <article className="view_useractions">
                    <div className="wrapper view_useractions_parent">
                        <div id="dynamic_deposit" data-action="deposit">
                            <form  onSubmit={handleSubmit}>
                                <div className="input-group">
                                    <label htmlFor='expensename'>Expense Name</label>
                                    <input type="text" name="expensename" value={expensename} onChange={(e) => {handleInputChange(setExpenseName, e.target.value)}}></input>
                                </div>
                                <div className="input-group">
                                    <label htmlFor='cost'>Cost</label>
                                    <input type="number" min="0" name="cost" value={cost} onChange={(e) => {handleInputChange(setCost, e.target.value)}}></input>
                                </div>
                                <div className="input-group">
                                    <button>
                                        <i className="ion-android-checkmark-circle"></i>
                                        &nbsp;
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    )
}
export default Expense