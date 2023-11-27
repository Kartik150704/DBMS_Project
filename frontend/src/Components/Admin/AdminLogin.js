import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FetchAPI } from '../Tools/FetchAPI';
import './AdminLogin.css'
const AdminLogin = () => {
    const [keyValue, setKeyValue] = useState('');
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = {
            Key: keyValue
        }
        let response = await FetchAPI('http://localhost:8000/admin/login', "POST", data)
        if (response.ok) {
            alert("Login Successful")
            navigate('/admin/home')
        }
        else {
            alert("Login Failed , Wrong Credential")
        }

    };

    return (
        <div className="adminFormContainer">
            <h2 className="adminHeading">Enter Key</h2>
            <form onSubmit={handleSubmit}>
                <label className="adminLabel" htmlFor="keyInput">
                    Key:
                </label>
                <input
                    className="adminInput"
                    type="text"
                    id="keyInput"
                    value={keyValue}
                    onChange={(e) => setKeyValue(e.target.value)}
                /><br /><br />

                <input className="adminSubmitBtn" type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default AdminLogin;
