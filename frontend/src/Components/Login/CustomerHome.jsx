import React, { useState, useEffect } from "react";
import { FetchAPI } from "../Tools/FetchAPI";
import ViewTable from "../Tables/ViewTable";
import { useNavigate } from "react-router-dom";
import './CustomerHome.css'
const CustomerHome = () => {

    const navigate = useNavigate()
    const [rideTo, setRideTo] = useState('');
    const [rideFrom, setRideFrom] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [rides, setRides] = useState([])
    const [showRides, setShowRides] = useState(false)
    const [rideDriverId, setrideDriverId] = useState('');
    const [rideMobileNumber, setRideMobileNumber] = useState('');
    const [showHistory, setShowHistory] = useState(false)
    const [historyData, setHistoryData] = useState([])
    useEffect(() => {
        const fetchData = () => {
            try {
                const data = localStorage.getItem('CustomerId');
                if (data) {
                    setCustomerId(data);
                }
            } catch (error) {
                console.error('Error fetching DriverId:', error);
            }
        };

        fetchData();
    }, []);
    const handleBooking = async (event) => {
        event.preventDefault();
        console.log('Booking Details:', { rideTo, rideFrom });
        let data =
        {
            RideFrom: rideFrom,
            RideTo: rideTo
        }
        let response = await FetchAPI('http://localhost:8000/customer/showrides', "POST", data)
        if (response.ok) {
            setShowRides(true)
            setRides(response.data)
        }
        else {
            alert("Data Fetching Failed")
        }
    };

    const handleShowHistory = async () => {

        let data =
        {
            MobileNumber: customerId
        }
        let response = await FetchAPI('http://localhost:8000/customer/showhistory', "POST", data)
        setHistoryData(response.data)

        console.log(response.data)
        setShowHistory(true)
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        let data = {
            DriverId: rideDriverId,
            CustomerMobileNumber: customerId
        }

        let response = await FetchAPI('http://localhost:8000/customer/bookride', "POST", data)
        if (response.ok) {
            alert("Ride booked Successfully")
            navigate('/customer/home')
        }
        else {
            alert("Error in booking Ride")
        }


    };
    return (
        <div className="customerHomeContainer">
            <div>
                <h1 className="customerHomeHeading">Welcome Customer {customerId}</h1>
                <form onSubmit={handleBooking} className="customerHomeForm">
                    <label>
                        Ride From:
                        <input
                            type="text"
                            value={rideFrom}
                            onChange={(e) => setRideFrom(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Ride To:
                        <input
                            type="text"
                            value={rideTo}
                            onChange={(e) => setRideTo(e.target.value)}
                        />
                    </label>
                    <br />
                    <button type="submit">Book Ride</button>
                </form>
            </div>
            {showRides && (
                <div>
                    {showRides && <ViewTable className="customerHomeTable" data={rides} />}
                    <h3 className="customerHomeHeading">
                        Enter Driver Id and your Mobile Number to book Ride
                    </h3>
                    <form onSubmit={handleSubmit} className="customerHomeForm">
                        <label>
                            Driver Id:
                            <input
                                type="text"
                                value={rideDriverId}
                                onChange={(e) => setrideDriverId(e.target.value)}
                            />
                        </label>
                        <br />
                        <label>
                            Mobile Number:
                            <input
                                type="text"
                                value={rideMobileNumber}
                                onChange={(e) => setRideMobileNumber(e.target.value)}
                            />
                        </label>
                        <br />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )}
            <button onClick={handleShowHistory} className="customerHomeForm">Show History</button>
            {showHistory && <ViewTable className="customerHomeTable" data={historyData} />}
        </div>
    );
};

export default CustomerHome;
