import React, { useState, useEffect } from 'react';
import './BookRide.css'
import { generateID } from '../Tools/GenerateId';
import { FetchAPI } from '../Tools/FetchAPI';
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''); // Create an array of alphabets from A to Z

function BookRide() {
    const [pickupLetter, setPickupLetter] = useState('A');
    const [destinationLetter, setDestinationLetter] = useState('B');
    const [fairprice, setFairPrice] = useState('')

    useEffect(() => {
        const eventSource = new EventSource('/bookRide');

        eventSource.onmessage = (event) => {
            console.log('Received event:', event.data);
        };

        eventSource.onerror = (error) => {
            console.error('SSE error:', error);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, []);

    useEffect(() => {

        const fairprice = 93 * (Math.abs(pickupLetter.charCodeAt(0) - destinationLetter.charCodeAt(0)));
        setFairPrice(fairprice);
    }, [pickupLetter, destinationLetter]);
    const handlePickupChange = (e) => {
        setPickupLetter(e.target.value);
    };

    const handleDestinationChange = (e) => {
        setDestinationLetter(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let rideId = generateID("RD")

        let rideData = {
            rideId: rideId,
            rideFrom: pickupLetter,
            rideTo: destinationLetter,
            ridePrice: fairprice
        }

        let response = await FetchAPI("http://localhost:8000/bookRide", "POST", rideData)
        console.log(response);  


    };

    return (
        <div>
            <h1>Ride Request Form</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="pickup">Pickup Location:</label>
                    <select id="pickup" name="pickup" value={pickupLetter} onChange={handlePickupChange}>
                        {alphabet.map((letter) => (
                            <option key={letter} value={letter}>
                                {letter}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="destination">Destination Location:</label>
                    <select
                        id="destination"
                        name="destination"
                        value={destinationLetter}
                        onChange={handleDestinationChange}
                    >
                        {alphabet.map((letter) => (
                            <option key={letter} value={letter}>
                                {letter}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <h2>Ride Price :{fairprice}</h2>
                </div>
                <div className="form-group">
                    <button type="submit">Request Ride</button>
                </div>
            </form>
        </div>
    );
}

export default BookRide;
