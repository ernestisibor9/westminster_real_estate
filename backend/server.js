const express = require('express');
const app = express();
const dotenv = require('dotenv');
const dbConnect = require('./config/dbConnect');
const userRoute = require('./route/userRoute')
const propertyRoute = require('./route/propertyRoute');
const ownerPropertyRoute = require('./route/ownerPropertyRoute');
dotenv.config()
const cors = require('cors')


let PORT = process.env.PORT || 5000;
dbConnect()

app.use(express.json())
app.use(cors())
app.use('/api/user', userRoute)
app.use('/api/property', propertyRoute)
app.use('/api/owner-property', ownerPropertyRoute)




app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
