const User = require("../models/user");
const Product = require("../models/product");
const mongoose = require("mongoose");

const addToCart = async (req, res) => {
  const { product_id, qty } = req.body;
  if (!mongoose.Types.ObjectId.isValid(product_id)) {
    return res.status(404).json({ error: "product not found!!!" });
  }

  let exist = await User.findOne({_id: req.user._id});

  if(exist.cart && exist.cart.length) {
    if(exist.cart.filter(c=>c.product_id == product_id).length) {
      return res.status(400).json({error: "Product already in cart."});
    }
  }

  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $push: {
        cart: {
          product_id
        },
      },
    }
  );

  if (!user) {
    return res.status(404).json({ error: "user not found!" });
  }

  const cart = await User.findOne({ _id: req.user._id }).select("cart").populate("cart.product_id");
  res.status(200).json({ msg: "success", cart });
};

const deleteItem = async (req, res) => {
  const product_id = req.params.id;
  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    { $pull: { cart: { product_id } } }
  );
  if (!user) {
    return res.status(404).json({ error: "not found!" });
  }
  res.status(200).json({ msg: "success", product_id });
};

const clearCart = async (req, res) => {
  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: { cart: [] } }
  );
  if (!user) {
    return res.status(404).json({ error: "user cart not found" });
  }
  res.status(200).json({ msg: "success" });
};

const getCarts = async (req, res) => {
  const user = await User.findOne({ _id: req.user._id }).select('cart').populate('cart.product_id');
  res.status(200).json({ msg: "success", cart: user.cart });
};

module.exports = { addToCart, getCarts, deleteItem, clearCart };
