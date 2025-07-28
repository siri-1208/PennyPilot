import React from 'react'

import {
  BrowserRouter as Router ,
  Routes , 
  Route,
  Navigate
} from 'react-router-dom';

import Login from "./pages/Auth/login";
import Home from './pages/dashboard/home';
import Signup from './pages/Auth/signup';
import Income from './pages/dashboard/income';
import Expenses from './pages/dashboard/expenses';
import UserProvider from './context/UserContext';
import Logout from './pages/Auth/logout';

const App = () => {
  return (
    
    <UserProvider>
      <div>
      <Router>
        <Routes>
          <Route path = "/" element={<Root/>}/>
          <Route path = "/login" exact element = {<Login/>} />
           <Route path = "/signup" exact element = {<Signup/>} />
           <Route path = "/home" exact element = {<Home/>} />
           <Route path = "/income" exact element = {<Income/>} />
           <Route path = "/expense" exact element = {<Expenses/>} />
           <Route path = "/logout" exact element = {<Logout/>} />
        </Routes>
      </Router>
    </div>
  </UserProvider>
  )
}

export default App

const Root = ()=>{
   //if token exists in local storage
   const isAuthenticated = !!localStorage.getItem("token")
   
   //redirect to dashboard if auth orelse to login
   return isAuthenticated ?(
    <Navigate to = "/dashboard" />
   ):(
    <Navigate to= "/login" />
   )
}
