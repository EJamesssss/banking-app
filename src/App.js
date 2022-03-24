import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import AddNewUser from './components/registration'
import LoginUser from './components/login'
import UserDashboard from './components/accountActivity'
import NavBar from './components/nav';
import AllUsers from './components/alluserstable';
import UserRegistration from './components/usersRegistration';
import BudgetMain from './components/budgetmain';
import ErrorPage from './components/errorpage';
import AdminRegistration from './components/adminRegistration';
import Expense from './components/expense';


function App (){
    
    return(
        <Router>
            <Routes>
                <Route path='/' element={<LoginUser />} />
                <Route path='usersreg' element={<UserRegistration />} />
                <Route path='admin' element={<NavBar />} >
                    <Route index element={<UserDashboard />} />
                    <Route path='adminreg' element={<AdminRegistration />} />
                    <Route path=':profname' element={<UserDashboard />} />
                    <Route path='adduser' element={<AddNewUser />} />
                    <Route path='users' element={<AllUsers />} />
                </Route>
                <Route path='budgetapp/:profname' element={<BudgetMain />} >
                </Route>
                <Route path='*' element={<ErrorPage />} />
                <Route path='expense' element={<Expense />} />
            </Routes>
        </Router>
    );
}

export default App