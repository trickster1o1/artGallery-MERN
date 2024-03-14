const User = require('../models/user');
const Product = require('../models/product');
const mongoose = require('mongoose');

const addToCart = async (req, res) => {
    const {product_id, qty} = req.body;
    if(!mongoose.Types.ObjectId.isValid(product_id)){
        return res.status(404).json({error: 'product not found!!!'});
    }
    const product = await Product.findOne({_id: product_id});
    
    if(!product) {
        return res.status(404).json({error: 'Product not found!'});
    }
    const user = await User.findOneAndUpdate({_id: req.user._id}, {$push: {cart: {
        product: product.title,
        product_id: product._id,
        price: product.price,
        quantity: qty,
        image: product.image,
        description: product.description
    }}});

    if(!user) {
        return res.status(404).json({error: 'user not found!'});
    }
    res.status(200).json({msg: 'success', user});
}

const deleteItem = async (req, res) => {
    const product_id = req.params.id;
    const user = await User.findOneAndUpdate({_id: req.user._id}, {$pull: {cart: {product_id}}});
    if(!user) {
        return res.status(404).json({error: 'not found!'});
    }
    res.status(200).json({msg: 'success', user});
} 

const clearCart = async (req, res) => {
    const user = await User.findOneAndUpdate({_id: req.user._id}, {$set: {cart: []}});
    if(!user) {
        return res.status(404).json({error: 'user cart not found'});
    }
    res.status(200).json({msg: 'success'});
}

const getCarts = async (req, res) => {
    const user = await User.findOne({_id: req.user._id});
    res.status(200).json({msg: 'success', cart: user.cart});
}

module.exports = { addToCart, getCarts, deleteItem, clearCart };