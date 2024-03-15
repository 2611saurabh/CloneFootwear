

//create express app
const exp = require('express')
const sellerApp = exp.Router();

const verifyToken = require('../Middleware/verifyToken')

const {getSeller,
     loginSeller,
     createSeller 
    } = require('../controllers/seller-controller')

    

//get express-async-handler to handle async errors
const expressAsyncHandler = require('express-async-handler');




//user CRUD

//read all users
sellerApp.get('/seller',expressAsyncHandler(getSeller))

//create user
sellerApp.post('/seller',expressAsyncHandler(createSeller))

//login User
sellerApp.post('/login',expressAsyncHandler(loginSeller))



module.exports = sellerApp;
