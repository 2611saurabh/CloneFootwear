const {Seller} = require("../db");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");



const getSeller = async (req, res) => {
  
    const usersList = await Seller.find();
    res.status(200).send({ message: "users", payload: usersList });
  };


  //create seller

  const createSeller = async (req, res) => {
    //check for existing user with same username
    let existingSeller = await Seller.findOne({ username: req.body.username });
    //user already existed
    if (existingSeller !== null) {
      return res.status(200).send({ message: "User already existed" });
    }
    //if user not existed, then hash password
    const hashedPassword = await bcryptjs.hash(req.body.password, 6);
    //replace plain password with hashed pw
    req.body.password = hashedPassword;
    const newSeller = await Seller.create(req.body);
  
    res.status(201).send({ message: "User created", payload: newSeller });
  };



  const loginSeller = async (req, res) => {
    //get user crdentials object from req
    const sellerCredentials = req.body;
    //console.log(userCredentials)
    //check username
    let seller = await Seller.findOne({ username: sellerCredentials.username });
    //if invalid username
    if (seller === null) {
      return res.status(200).send({ message: "Invalid username" });
    }
    //if username is found, compare passwords
    const result = await bcryptjs.compare(
      sellerCredentials.password,
      seller.password
    );
    //if pasword not matched
    if (result === false) {
      return res.status(200).send({ message: "Invalid password" });
    }
    //Create jwt token and sign it
    const signedToken = jwt.sign(
      { username: seller.username },
      'abcdef',
      { expiresIn: "1d"}
    );
    res
      .status(200)
      .send({ message: "login success", token: signedToken, seller: seller });
  };



  module.exports = {getSeller, loginSeller, createSeller};