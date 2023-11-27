const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();


app.use(bodyParser.json());
app.use(cors());

const sendEmail=require('./Routers/Tools/SendEmail')
app.use(sendEmail)

const driverSignUp=require('./Routers/Driver/DriverSignUp')
app.use(driverSignUp)

const customerSignUp=require('./Routers/Customer/CustomerSignUp')
app.use(customerSignUp)

const customerLogin=require('./Routers/Customer/CustomerLogin')
app.use(customerLogin)

const driverLogin=require('./Routers/Driver/DriverLogin')
app.use(driverLogin)

const bookRide=require('./Routers/Customer/BookRide')
app.use(bookRide)

const AdminLogin=require('./Routers/Admin/AdminLogin')
app.use(AdminLogin)
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
