const Product = require("../models/product");
const mongoose = require("mongoose");

const getProducts = async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 });
  res.status(200).json(products);
};

const productDetail = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({msg: 'Product Not Found! '+id});
    }

    try {
        const product = await Product.findOne({_id:id});
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const postProduct = async (req, res) => {
  const { title, price, description, image } = req.body;
  try {
    const product = await Product.create({
      title,
      price,
      image,
      description,
      reviews: []
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProduct = async (req,res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({msg: 'Product Not Found! '+id});
    }
    try {
        const product = await Product.findOneAndDelete({_id:id});
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const deleteAll = async (req, res) => {
    const prod = await Product.deleteMany({});
    res.status(400).json(prod);
}

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const {price,description,title, image} = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({msg: 'Product Not Found! '+id});
    }
    try {
        const product = await Product.findOneAndUpdate({_id:id}, { $set: {price} });
        if(!product) {
            return res.status(400).json({msg: 'Product Not Found! '+id});
        }
       
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}

module.exports = { getProducts, postProduct, deleteProduct, updateProduct, productDetail, deleteAll };
