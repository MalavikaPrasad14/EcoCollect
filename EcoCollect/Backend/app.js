const express =require('express');
const cors =require('cors');
require ('./db/connection');

const booking_route=require('./route/bookingRoutes')
const user_route=require('./route/userRoutes')
const app = new express();


require('dotenv').config();
const port = process.env.PORT;

app.use(cors());

app.use('/user',user_route);
app.use('/booking',booking_route)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})