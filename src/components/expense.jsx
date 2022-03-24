import React, {useState} from 'react';
import "../App.css";
import logo from "../assets/images/logo.png";
import update from "../assets/images/update.png";
import remove from "../assets/images/remove.png";

const Expense = () => {
    
    const [expense, setExpense] = useState([])

    const [id, setId] = useState(0)
    const [expensename, setExpenseName] = useState('')
    const [cost, setCost] = useState('')

    const [isEditing, setIsEditing] = useState(false)
    const [isEditingId, setIsEditingId] = useState(0)

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
    }

    const editExpense = (id) => {
        const selectedExp = expense.find(exp => exp.id == id)
        selectedExp.expensename = expensename
        selectedExp.cost = cost
        const updatedExp = expense.map((exp) =>
        exp.id === id ? { ...selectedExp } : exp
        )
        setExpense(updatedExp)
        resetInput()
    }

    const addExpense = () => {
        const newExp = { id: expense.length, expensename, cost }
        setExpense([...expense, newExp])
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

    return (
        <section id="view_loggedin">
            <nav>
                <img src={logo} />
                <h1>
                    PiggyBank<span>.</span>
                </h1>
                <ul className="nav-options">
                    <li className="active-nav" data-view="register">Expenses</li>
                    <li data-view="login" >Logout</li>
                </ul>
            </nav>
            <div className="view_expense">
                <article className="view_usercard">
                    <div className="wrapper">
                        <div className="user_informations">
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
                                    {expense.map(({id, expensename, cost}) => {
                                        return (
                                            <tr key={id + expensename}>
                                                <td>{id}</td>
                                                <td></td>
                                                <td></td>
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
                                    <input type="text" name="cost" value={cost} onChange={(e) => {handleInputChange(setCost, e.target.value)}}></input>
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