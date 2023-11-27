import React from "react";
import { useState, useEffect } from "react";
import ViewTable from "../Tables/ViewTable";
import { FetchAPI } from "../Tools/FetchAPI";
import './AdminHome.css'


const AdminHome= () => {
    const [driverId, setDriverId] = useState('');
    const [verificationKey, setVerificationKey] = useState('');
    const [driverData, setDriverData] = useState([])
    useEffect(() => {
        const fetchData = () => {
            FetchAPI('http://localhost:8000/admin/getdriverdata', "GET")
                .then((response) => {

                    if (response.ok) {
                        setDriverData(response.data)

                    }
                })
        };

        fetchData();
    }, []);

    const handleSubmit =async (e) => {
        e.preventDefault();
        
        let data={
            DriverId:driverId,
            VerificationKey:verificationKey
        }
        let response=await FetchAPI('http://localhost:8000/admin/verifydriver',"POST",data);
        if(response.ok)
        {
            alert("Driver Verified successfully")
        }
        else
        {
            if(response.key==false)
            {
                alert("Wrong Key")
            }
            else
            {
                alert("Error in verifying driver")

            }
        }
    };

    return (
        <div className="adminHomeContainer">
        <ViewTable data={driverData} />
        <h2 className="adminHomeHeading">Driver Verification</h2>
        <form onSubmit={handleSubmit}>
          <label className="adminHomeLabel" htmlFor="driverId">Driver ID:</label>
          <input
            className="adminHomeInput"
            type="text"
            id="driverId"
            value={driverId}
            onChange={(e) => setDriverId(e.target.value)}
          /><br /><br />
  
          <label className="adminHomeLabel" htmlFor="verificationKey">Verification Key:</label>
          <input
            className="adminHomeInput"
            type="text"
            id="verificationKey"
            value={verificationKey}
            onChange={(e) => setVerificationKey(e.target.value)}
          /><br /><br />
  
          <input className="adminHomeSubmitBtn" type="submit" value="Submit" />
        </form>
      </div>
    );
};

export default AdminHome;
