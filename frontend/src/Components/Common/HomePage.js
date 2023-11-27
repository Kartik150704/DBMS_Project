import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Import the CSS file

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="HomePage">
      <button className="homeAdminButton" onClick={() => navigate('/admin/login')}>Admin Login</button>
      <button className="homeCustomerButton" onClick={() => navigate('/customer/login')}>Customer Login</button>
      <button className="homeCustomerButton" onClick={() => navigate('/customer/signup')}>Customer Signup</button>
      <button className="homeDriverButton" onClick={() => navigate('/driver/login')}>Driver Login</button>
      <button className="homeDriverButton" onClick={() => navigate('/driver/signup')}>Driver Signup</button>
    </div>
  );
};

export default Home;
