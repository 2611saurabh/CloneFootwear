
const {Product} = require('../db')


//Create new User
const createProduct = async (req, res) => {
    //check for existing user with same username
    let existingProduct = await Product.findOne({ name: req.body.name });
    //user already existed
    if (existingProduct !== null) {
      return res.status(200).send({ message: "Product already existed" });
    }
    //if user not existed, then hash password
    // const hashedPassword = await bcryptjs.hash(req.body.password, 6);
    // //replace plain password with hashed pw
    // req.body.password = hashedPassword;
    const newProduct = await Product.create(req.body);
  
    res.status(201).send({ message: "Product created", payload: newProduct });
  };


  //get all product

  const getProduct = async (req, res) => {
  
    const productList = await Product.find();
    res.status(200).send({ message: "products", payload: productList });
  };

  const getProductById = async(req,res)=>{
    let id = req.params.id
    
    let product = await Product.findOne({id:id})
    
    res.send({message:"Got Id",payload:product})
  }

  //delete Product 
  const productDelete = async (req,res) =>{
    const deletProduct = await Product.findByIdAndDelete(req.params.id);
    if(!deletProduct){
      return res.status(404).send({message:"Product not found"});
    }
    else{
      res.send({message:"Product Deleted Successfully"});
    }
  }



  module.exports = {createProduct, getProduct,productDelete,getProductById};