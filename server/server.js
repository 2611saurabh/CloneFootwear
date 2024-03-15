//Create express app

const exp = require('express')
const app = exp(); 
const path = require('path')

//connect with angular application
app.use(exp.static(path.join(__dirname,'../client/dist/clone-footwear/browser')))

//importing db model here from db.js


//configuration enviroment variables
require('dotenv').config()

//add body parsing middleware
app.use(exp.json());


//import api
const userApp = require('./API/User_api');
const productApp = require('./API/Product-api');
const sellerApp = require('./API/Seller-api')

//forward request userapp when path start withe '/user-api'
app.use('/user-api',userApp)

app.use('/product-api',productApp);

app.use('/seller-api',sellerApp);

//synchronous error handler middleware
app.use((err,req,res,next) => {
    res.send({message:err.message,payload:err})
})


//path given for frontend directory
app.use((req,res,next)=>{
    res.sendFile((path.join(__dirname, '../client/dist/clone-footwear/browser/index.html')));
})

//asign port number

const PORT = process.env.PORT || 4000
app.listen(4000,()=>
    console.log(`welcome to server port`)
)
