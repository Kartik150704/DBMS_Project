CREATE TABLE Driver (
    DriverId VARCHAR(50),
    Name VARCHAR(50) NOT NULL,
    AdharNumber VARCHAR(12) NOT NULL,
    Vehicle VARCHAR(50),
    VehicleNumber VARCHAR(20),
    MobileNumber VARCHAR(15),
    Status VARCHAR(20),
    PRIMARY KEY (DriverId),
    UNIQUE (AdharNumber)
);

DELIMITER //
CREATE PROCEDURE InsertDriver(
    IN p_DriverId VARCHAR(50),
    IN p_Name VARCHAR(50),
    IN p_AdharNumber VARCHAR(12),
    IN p_Vehicle VARCHAR(50),
    IN p_VehicleNumber VARCHAR(20),
    IN p_MobileNumber VARCHAR(15),
    IN p_Status VARCHAR(20)
)
BEGIN
    INSERT INTO Driver (
        DriverId,
        Name,
        AdharNumber,
        Vehicle,
        VehicleNumber,
        MobileNumber,
        Status
    )
    VALUES (
        p_DriverId,
        p_Name,
        p_AdharNumber,
        p_Vehicle,
        p_VehicleNumber,
        p_MobileNumber,
        p_Status
    );
END //
DELIMITER ;
CREATE TABLE Rides (
    DriverId varchar(50),
    DriverName VARCHAR(50),
    RideFrom VARCHAR(50),
    RideTo VARCHAR(50),
    VehicleName VARCHAR(50),
    VehicleNumber VARCHAR(50),
    MobileNumber VARCHAR(50),
    Amount VARCHAR(50),
    Status varchar(50)
);

CREATE TABLE Customer (
    Name VARCHAR(50),
    MobileNumber VARCHAR(50) PRIMARY KEY,
    Password VARCHAR(200)
);

CREATE TABLE RideHistory (
    DriverId VARCHAR(50),
    DriverMobileNumber VARCHAR(15),
    DriverName VARCHAR(50),
    VehicleName VARCHAR(50),
    VehicleNumber VARCHAR(20),
    RideFrom VARCHAR(50),
    RideTo VARCHAR(50),
    AmountPaid DECIMAL(10, 2),
    CustomerMobileNumber VARCHAR(15)
);

DELIMITER //

CREATE PROCEDURE book_ride(IN driverId_param VARCHAR(50), IN customerMobileNumber_param VARCHAR(50))
BEGIN
    DECLARE driverName_val VARCHAR(50);
    DECLARE rideFrom_val VARCHAR(50);
    DECLARE rideTo_val VARCHAR(50);
    DECLARE vehicleName_val VARCHAR(50);
    DECLARE vehicleNumber_val VARCHAR(50);
    DECLARE mobileNumber_val VARCHAR(50);
    DECLARE amount_val VARCHAR(50);
    DECLARE status_val VARCHAR(50);

    -- Retrieve data from Rides table based on DriverId and CustomerMobileNumber
    SELECT DriverName, RideFrom, RideTo, VehicleName, VehicleNumber, MobileNumber, Amount, Status
    INTO driverName_val, rideFrom_val, rideTo_val, vehicleName_val, vehicleNumber_val, mobileNumber_val, amount_val, status_val
    FROM Rides
    WHERE DriverId = driverId_param and Status='initialized';

    -- Insert the retrieved data into RideHistory table
    INSERT INTO RideHistory (DriverId, DriverName, RideFrom, RideTo, VehicleName, VehicleNumber, DriverMobileNumber, AmountPaid, CustomerMobileNumber)
    VALUES (driverId_param, driverName_val, rideFrom_val, rideTo_val, vehicleName_val, vehicleNumber_val, mobileNumber_val, amount_val, customerMobileNumber_param);

    -- Delete the data from Rides table
    update Rides set Status="ended"
    WHERE DriverId = driverId_param;
END //
DELIMITER ;