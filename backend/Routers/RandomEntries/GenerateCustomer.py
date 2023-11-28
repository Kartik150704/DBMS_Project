import random
import string

# Open a file to write the SQL INSERT statements
with open('./Routers/RandomEntries/Customer_Data.txt', 'w') as file:
    # Generate 50 dummy entries for Customer table and write them to the file
    for i in range(1, 51):
        name = f'Customer {i}'
        mobile_number = ''.join(random.choices(string.digits, k=10))
        password = ''.join(random.choices(string.ascii_letters + string.digits, k=12))  # Generating a 12-character password

        # Write the INSERT statement for each entry to the file
        file.write(f"INSERT INTO Customer (Name, MobileNumber, Password) VALUES "
                   f"('{name}', '{mobile_number}', '{password}');\n")
