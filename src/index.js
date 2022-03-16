import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import reportWebVitals from './reportWebVitals';
// import AddNewUser from './components/registration'
// import LoginUser from './components/login'
// import UserDashboard from './components/accountActivity'

ReactDOM.render(
  <React.StrictMode>
    {/* <AddNewUser />
    <LoginUser />
    <UserDashboard /> */}
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
