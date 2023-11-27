import React, { useState, useEffect } from "react";
import './CustomerLogin.css'
import { uploadImageToFirebase } from "../FireBase/ImageUploader";
import { generateID } from "../Tools/GenerateId";
import { FetchAPI } from "../Tools/FetchAPI";
import sha256 from 'crypto-js/sha256';
import { useNavigate } from "react-router-dom";
const CustomerLogin = () => {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        mobileNumber: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();




        let customerData = {
            MobileNumber: formData.mobileNumber,
            password: sha256(formData.password).toString()
        }
        let response = await FetchAPI('http://localhost:8000/customer/login', "POST", customerData)
        if (response.ok) {
            if (response.presence) {
                localStorage.setItem('CustomerId', formData.mobileNumber)
                alert("Login successfully")
                navigate('/customer/home')
            }
            else {
                alert("Please Sign Up firsrt")
            }
        }
        else {
            alert("Error in Logging in , please try after some time")
        }


    };

    return (
        <div className="CustomerLoginFormContainer">
            <h1 className="CustomerLoginFormTitle">Customer Login</h1>
            <form onSubmit={handleSubmit} className="CustomerLoginForm">
                <div className="form-group">
                    <label htmlFor="mobileNumber">Mobile Number:</label>
                    <input
                        type="tel"
                        id="mobileNumber"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleInputChange}
                        required
                        className="CustomerLoginFormInput"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="CustomerLoginFormInput"
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="submit-button">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CustomerLogin