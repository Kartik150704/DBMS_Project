import React, { useState, useEffect } from "react";
import { FetchAPI } from "../Tools/FetchAPI";
import ViewTable from "../Tables/ViewTable";
import './DriverHome.css'
const DriverHomePage = () => {
    const [driverId, setDriverId] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [isVerified, setIsVerified] = useState(false)
    const [isBusy, setIsBusy] = useState(false)
    const [rideDetails, setRideDetails] = useState({
        rideFrom: '',
        rideTo: '',
        amount: ''
    });
    const [showHistory, setShowHistory] = useState(false)
    const [historyData, setHistoryData] = useState([])

    useEffect(() => {
        const fetchData = () => {
            try {
                const data = localStorage.getItem('DriverId');
                FetchAPI('http://localhost:8000/driver/checkstatus', "POST", { DriverId: data })
                    .then((response) => {

                        if (response.ok) {
                            setIsBusy(response.busy)
                            setIsVerified(response.verified)
                        }

                    })




                if (data) {
                    setDriverId(data);
                }
            } catch (error) {
                console.error('Error fetching DriverId:', error);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRideDetails({ ...rideDetails, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Submitted Ride Details:', rideDetails);
        let data = {
            DriverId: driverId,
            RideFrom: rideDetails.rideFrom,
            RideTo: rideDetails.rideTo,
            Amount: rideDetails.amount
        }
        let response = await FetchAPI("http://localhost:8000/driver/offerride", "POST", data)
        if (response.ok) {
            alert("Ride has been successfully booked")
            setIsBusy(true)
        }
        else {
            alert("Error in Booking Ride , Try after some time")
        }
    };
    const handleHistory = async () => {
        if (showHistory) {
            setShowHistory(false)
            return
        }
        let response = await FetchAPI('http://localhost:8000/driver/showhistory', "POST", { DriverId: driverId })
        if (response.ok) {
            setShowHistory(true)
            setHistoryData(response.data)
        }
        else {
            alert("Error in fetching data")
        }
    }
    return (
        <div className="DriverHome-container">
            <h1>Driver ID: {driverId}</h1>
            {!isVerified && <h3>Your status is pending, we will verify it soon</h3>}
            {isBusy && isVerified && (
                <h3>You have offered a ride already, can't book more rides</h3>
            )}
            {!isBusy && isVerified && (
                <div>
                    <button onClick={() => setShowForm(!showForm)}>
                        {showForm ? "Hide Offer Ride Form" : "Offer Ride"}
                    </button>
                    {showForm && (
                        <form onSubmit={handleSubmit}>
                            <label>
                                Ride From:
                                <input
                                    type="text"
                                    name="rideFrom"
                                    value={rideDetails.rideFrom}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <br />
                            <label>
                                Ride To:
                                <input
                                    type="text"
                                    name="rideTo"
                                    value={rideDetails.rideTo}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <br />
                            <label>
                                Amount:
                                <input
                                    type="text"
                                    name="amount"
                                    value={rideDetails.amount}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <br />
                            <button type="submit">Submit</button>
                        </form>
                    )}
                    <button onClick={handleHistory}>Get History</button>
                </div>
            )}
            {showHistory && <ViewTable className="ViewTable" data={historyData} />}
        </div>
    );
};

export default DriverHomePage;
