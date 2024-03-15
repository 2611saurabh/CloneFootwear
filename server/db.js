//import mongoose
const mongoose = require('mongoose')
require('dotenv').config()

//connect to db
mongoose.connect(process.env.LOCAL_DB_URL)
.then(() => console.log("DB connection in success"))
.catch(err => console.log("errpr in db connect",err))

//schema means structure of document
//create schema ODM-> object document model
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Username is required here'],
        miniLength: [4,'minimum length can be 4']
    },
    password:{
        type:String,
        required:[true,'Password Required'],
        minLength:6
    },
    email:{
        type:String,
        required:true
    },
    cart:[{}]
    // dob:Date
})

//Seller Db schema

const sellerSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Username is required here'],
        miniLength: [4,'minimum length can be 4']
    },
    password:{
        type:String,
        required:[true,'Password Required'],
        minLength:6
    },
    email:String
    // dob:Date
})


const productSchema = new mongoose.Schema({
    id:Number,
    name:String,
    brand:String,
    gender:String,
    category:String,
    size:String,
    color:String,
    price:Number,
    imageURL:String,
    
})

//create Model(class) for the productSchema
const Product = mongoose.model('product',productSchema)

//create Model(class) for the userSchema
const User = mongoose.model('user',userSchema)


//create Model(class) for the product Schema
const Seller = mongoose.model('seller',sellerSchema);



module.exports = {User,Product,Seller}

