
//import User model
const {User} = require("../db");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config()




const getUserByUsername = async (req, res) => {
  let currentUser = req.params.username;
  const userList = await User.findOne({username:currentUser});
  res.send({message:"get user",payload:userList});
};

//Create new User
const createUser = async (req, res) => {

  //check for existing user with same username

  let existingUser = await User.findOne({ username: req.body.username });

  //user already existed

  if (existingUser !== null) {
    
    return res.status(200).send({ message: "User already existed" });

  }

  //if user not existed, then hash password

  const hashedPassword = await bcryptjs.hash(req.body.password, 6);

  //replace plain password with hashed pw

  req.body.password = hashedPassword;

  const newUser = await User.create(req.body);

  res.status(201).send({ message: "User created", payload: newUser });
};



//User login controller
const loginUser = async (req, res) => {

  //get user crdentials object from req

  const userCredentials = req.body;
 
  let user = await User.findOne({ username: userCredentials.username });

  //if user having invalid username

  if (user === null) {

    return res.status(200).send({ message: "Invalid username" });

  }

  //if username is found, compare passwords

  const result = await bcryptjs.compare(
    userCredentials.password,
    user.password
  );

  //if pasword not matched

  if (result === false) {

    return res.status(200).send({ message: "Invalid password" });

  }

  //Create jwt token and sign it

  const signedToken = jwt.sign(
    { username: user.username },
    'abcdef',
    { expiresIn: "1d"}
  );

  res.status(200).send({ message: "login success", token: signedToken, user: user });
};


const updateUser = async (req, res) => {
  let user = await User.findOneAndUpdate(
    { username: req.body.username },
    { ...req.body }
  );
  res.status(200).send({ message: "User modified", payload: user });
};


//add to cart

const addtocart=async(req,res)=>{
  let username=req.params.username;
  
  let findUser=await User.findOne({username:username})
  
  //check user exist or not
  if(findUser===null)
  {

    res.send({message:"user not present"})
  }
  else
  {
    findUser.cart.push(req.body)
    
    let upadateUser=await User.updateOne({_id:findUser._id},{$set:{...findUser}})
    res.status(200).send({message:"cart is updated",payload:upadateUser})
  }
}


//deleteFromCart

const deleteFromCart = async(req,res) => {

  let username = req.params.username;
  let data = req.body.abc;
  
  let result = await User.findOneAndUpdate({username:username},{"$pull":{cart:{_id:data}}})
  res.status(200).send({message:"Product Remove",payload:result})

}

const getSensitiveData=(req,res)=>{
  res.send({message:"User's sensitve data is here"})
}
//export
module.exports = {
  getUserByUsername,
  createUser,
  updateUser,
  loginUser,
  getSensitiveData,
  addtocart,
  deleteFromCart
};