const exp = require('express')
const productApp = exp.Router();

const verifyToken = require('../Middleware/verifyToken')





//get express-async-handler to handle async errors
const expressAsyncHandler = require('express-async-handler');


const {createProduct, getProduct,productDelete,getProductById} = require('../controllers/product-controller')
// const getProduct = require('../controllers/product-controller')


//Product Crud

productApp.post('/product',expressAsyncHandler(createProduct));

productApp.get('/product',expressAsyncHandler(getProduct));

productApp.delete('/product/:id',expressAsyncHandler(productDelete))

productApp.get('/product/:id',expressAsyncHandler(getProductById));

 

module.exports = productApp;