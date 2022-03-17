import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import AddNewUser from './components/registration'
import LoginUser from './components/login'
import UserDashboard from './components/accountActivity'
import NavBar from './components/nav';


function App (){
    return(
        <Router>
            <Routes>
                <Route path='/' element={<LoginUser />} />
                <Route path='admin' element={<NavBar />} >
                    <Route path='dashboard' element={<UserDashboard />} />
                    <Route path='adduser' element={<AddNewUser />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App