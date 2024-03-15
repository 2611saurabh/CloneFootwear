//create express app
const exp = require('express')
const userApp = exp.Router();

// const verifyToken = require('../Middleware/verifyToken')

const {
     getUserByUsername, 
     createUser, 
     updateUser, 
     loginUser,
     addtocart,
     deleteFromCart
    } = require('../controllers/user-controller')

//get express-async-handler to handle async errors
const expressAsyncHandler = require('express-async-handler');




//user CRUD

/*************************************************************************************************/


//read user by username cart
userApp.get('/user/:username', expressAsyncHandler(getUserByUsername))

//create user
userApp.post('/user',expressAsyncHandler(createUser))

//login User
userApp.post('/login',expressAsyncHandler(loginUser))

//update user
userApp.put('/user', expressAsyncHandler(updateUser))

//add to cart in repective user data
userApp.put('/user/:username',expressAsyncHandler(addtocart))

//deletFromCart
userApp.post('/user/:username',expressAsyncHandler(deleteFromCart))

module.exports = userApp; 
