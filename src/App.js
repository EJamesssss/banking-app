import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import AddNewUser from './components/registration'
import LoginUser from './components/login'
import UserDashboard from './components/accountActivity'


function App (){
    return(
        <Router>
            <Routes>
                <Route path='/' element={<LoginUser />} />
                <Route path='/dashboard' element={<UserDashboard />} />
                <Route path='/adduser' element={<AddNewUser />} />
            </Routes>
        </Router>
    );
}

export default App