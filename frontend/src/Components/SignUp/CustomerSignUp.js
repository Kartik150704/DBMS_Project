import React, { useState, useEffect } from "react";
import './CustomerSignUp.css'
import { uploadImageToFirebase } from "../FireBase/ImageUploader";
import { generateID } from "../Tools/GenerateId";
import { FetchAPI } from "../Tools/FetchAPI";
import sha256 from 'crypto-js/sha256';
import { useNavigate } from "react-router-dom";
const CustomerSignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        mobileNumber: '',
        password: ''
    });
    const navigate = useNavigate()
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        let customerId = generateID("CS")



        let customerData = {

            CustomerName: formData.name,
            MobileNumber: formData.mobileNumber,
            password: sha256(formData.password).toString()
        }
        let response = await FetchAPI('http://localhost:8000/customer/signup', "POST", customerData)
        if (response.ok) {
            alert("Signed Up successfully , you can login now")
            navigate('/customer/login')
        }
        else {
            alert("Error in Signing Up!")
        }

    };

    return (
        <div className="customersignup-form-container">
            <h1 className="customersignup-form-title">Signup</h1>
            <form onSubmit={handleSubmit} className="customersignup-form">
                <div className="customersignup-form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="customersignup-form-group">
                    <label htmlFor="mobileNumber">Mobile Number:</label>
                    <input
                        type="tel"
                        id="mobileNumber"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="customersignup-form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="customersignup-form-group">
                    <button type="submit" className="submit-button">
                        Signup
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CustomerSignUp