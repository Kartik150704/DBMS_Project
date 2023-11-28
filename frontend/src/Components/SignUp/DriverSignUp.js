import React, { useState } from 'react';
import { FetchAPI } from '../Tools/FetchAPI';
import { useNavigate } from 'react-router-dom';
import './DriverSignUp.css'
const MyForm = () => {
  const [formData, setFormData] = useState({
    Name: '',
    AdharNumber: '',
    Vehicle: '',
    VehicleNumber: '',
    MobileNumber: '',
    status: ''
  });
  const navigate = useNavigate()
  const [driverId, setDriverId] = useState('')
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    let response = await FetchAPI("http://localhost:8000/driver/signup", "POST", formData)
    if(response.error)
    {
       alert(response.error.message)
    }
    if (response.ok) {
      setDriverId(response.DriverId)
    }
  };

  return (
    <div className="DriverSignUp-container">
      {driverId === "" && (
        <form onSubmit={handleSubmit} className="DriverSignUp-form">
          <div>
            <label>
              Name:
              <input
                type="text"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Adhar Number:
              <input
                type="text"
                name="AdharNumber"
                value={formData.AdharNumber}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Vehicle:
              <input
                type="text"
                name="Vehicle"
                value={formData.Vehicle}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Vehicle Number:
              <input
                type="text"
                name="VehicleNumber"
                value={formData.VehicleNumber}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Mobile Number:
              <input
                type="text"
                name="MobileNumber"
                value={formData.MobileNumber}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      )}
      {driverId !== "" && (
        <div className="DriverSignUp-details">
          <h3>Driver Id : {driverId}</h3>
          <button onClick={() => navigate('/driver/login')}>
            Go To Login Page
          </button>
        </div>
      )}
    </div>
  );
};

export default MyForm;
