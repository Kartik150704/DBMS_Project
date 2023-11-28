import random
import string

# Function to generate a random DriverId following the specified pattern
def generate_driver_id():
    prefix = 'DVXgxBQJ4R'
    random_number = ''.join(random.choices(string.digits, k=2))
    return f'{prefix}{random_number}'

# Open a file to write the SQL INSERT statements
with open('./Routers/RandomEntries/DriverData.txt', 'w') as file:
    # Generate 50 dummy entries and write them to the file
    for i in range(1, 51):
        driver_id = generate_driver_id()
        name = f'Driver {i}'
        adhar_number = ''.join(random.choices(string.digits, k=12))
        vehicle = random.choice(['Car', 'Truck', 'Motorcycle'])
        vehicle_number = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
        mobile_number = ''.join(random.choices(string.digits, k=10))
        status = random.choice(['Pending', 'Verified'])

        # Write the INSERT statement for each entry to the file
        file.write(f"INSERT INTO Driver (DriverId, Name, AdharNumber, Vehicle, VehicleNumber, MobileNumber, Status) VALUES "
                   f"('{driver_id}', '{name}', '{adhar_number}', '{vehicle}', '{vehicle_number}', '{mobile_number}', '{status}');\n")
