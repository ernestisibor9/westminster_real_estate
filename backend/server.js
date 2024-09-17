const express = require('express');
const app = express();
const dotenv = require('dotenv');
const dbConnect = require('./config/dbConnect');
const userRoute = require('./route/userRoute')
const propertyRoute = require('./route/propertyRoute');
const ownerPropertyRoute = require('./route/ownerPropertyRoute');
// const path = require('path');

dotenv.config()
const cors = require('cors')

// Connect to the database to 
let PORT = process.env.PORT || 5000;
dbConnect()

// Middlewares 
/* Note that without the express.json() middleware
    you will not be able to add any records to the database
*/
app.use(express.json())
app.use(cors())
app.use('/api/user', userRoute)
app.use('/api/property', propertyRoute)
app.use('/api/owner-property', ownerPropertyRoute)


// Server listening to PORT 5000
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
