import React, { useState, useEffect } from 'react';
import DriverSignUp from './Components/SignUp/DriverSignUp'
import CustomerSignUp from './Components/SignUp/CustomerSignUp';
import CustomerLogin from './Components/Login/CustomerLogin'
import DriverLogin from './Components/Login/DriverLogin';
import BookRide from './Components/Ride/BookRide';
import DriverHomePage from './Components/Login/DriverHomePage';
import CustomerHome from './Components/Login/CustomerHome';
import AdminHome from './Components/Admin/AdminHome';
import AdminLogin from './Components/Admin/AdminLogin';
import Home from './Components/Common/HomePage';
import { BrowserRouter as Router, Routes, Switch ,Route} from 'react-router-dom';
const App = () => {


  return (
    <Router>
      <Routes>
          <Route exact path='/driver/home' element=<DriverHomePage/>/>
          <Route exact path='/driver/login' element=<DriverLogin/>/>
          <Route exact path='/driver/signup' element=<DriverSignUp/>/>
          <Route exact path='/customer/signup' element=<CustomerSignUp/>/>
          <Route exact path='/customer/login' element=<CustomerLogin/>/>
          <Route exact path='/customer/home' element=<CustomerHome/>/>
          <Route exact path='/admin/home' element=<AdminHome/>/>
          <Route exact path='/admin/login' element=<AdminLogin/>/>
          <Route exact path='/home' element=<Home/>/>
          
      </Routes>
    </Router>
  );
}

export default App;
