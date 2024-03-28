const Product = require("../models/product");
const Order = require("../models/order");
const User = require("../models/user");

const getProducts = async (req, res) => {
    const _id = req.user._id;
    const user = await User.findOne({_id})
    if(user.userType !== 'admin') {
      return res.status(400).json({error: 'Unauthorized'});
    }
  const products = await Product.find({}).sort({ createdAt: -1 });
  res.status(200).json(products);
};

const getOrders = async (req, res) => {
    const _id = req.user._id;
    const user = await User.findOne({_id})
    if(user.userType !== 'admin') {
      return res.status(400).json({error: 'Unauthorized'});
    }
    const orders = await Order.find({}).sort({createdAt: -1});
    res.status(200).json(orders);
};

const getUsers = async (req, res) => {
  const user = await User.find({}).sort({'createdAt': -1});
  res.status(200).json(user);
};

const productStatus = async (req, res) => {
    const _id = req.user._id;
    const user = await User.findOne({_id})
    if(user.userType !== 'admin') {
      return res.status(400).json({error: 'Unauthorized'});
    }
    const { id, status } = req.body;
    const prod = await Product.findOneAndUpdate({_id: id}, {$set: {status}});
    if(!prod) {
        return res.status(400).json({error: 'Product not found! '+status});
    }
    res.status(200).json({msg: 'success'});
}

module.exports = { getProducts, getOrders, getUsers, productStatus };
