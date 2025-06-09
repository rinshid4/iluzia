
const express =require('express');
const Connectdb = require('./config/db');
require('dotenv').config();
const authroutes = require('./routes/routes')
const app =express();
// db call
Connectdb();
// middle ware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth',authroutes)












app.listen(process.env.PORT ,function() {
    console.log("server is running")
})