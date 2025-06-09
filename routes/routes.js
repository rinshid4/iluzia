const express =require('express');
const route =express.Router();
const authcontroller =require('../controllers/auth')





// register
 
route.post('/register',authcontroller.Register);

 
route.post('/login',authcontroller.login);


module.exports = route

