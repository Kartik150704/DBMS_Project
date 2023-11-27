import React, { useState } from 'react';
import { FetchAPI } from '../Tools/FetchAPI';
import { useNavigate } from 'react-router-dom';
import './DriverLogin.css'
const DriverLoginPage = () => {
  const [adharNumber, setAdharNumber] = useState('');
  const [driverId, setDriverId] = useState('');
  const navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault();
    let data =
    {
      DriverId: driverId,
      AdharNumber: adharNumber
    }
    let response = await FetchAPI('http://localhost:8000/driver/login', "POST", data)
    if (response.ok) {
      if (response.ispresent) {
        localStorage.setItem('DriverId', driverId)
        alert("Login Successfully")
        navigate('/driver/home')
      }
      else {
        alert("User is not signed up , please sign up first")
      }
    }
    else {
      alert("Error in Login , please try again after sometime")
    }

  };

  return (
    <div className="Driverlogin-container">
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Adhar Number:
          <input
            type="text"
            value={adharNumber}
            onChange={(e) => setAdharNumber(e.target.value)}
          />
        </label>
        <br />
        <label>
          Driver ID:
          <input
            type="text"
            value={driverId}
            onChange={(e) => setDriverId(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DriverLoginPage;
