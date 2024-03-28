const mongoose = require("mongoose");
const Order = require("../models/order");
const User = require("../models/user");
const Product = require("../models/product");

const orderProd = async (id, user, query, type) => {
  if (!query) {
    return { error: "Request Blocked!" };
  }
  const data = JSON.parse(Buffer.from(query, "base64").toString("utf-8"));
  let prod = null;
  if (type === "product") {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { error: "Product not found" };
    }
    prod = await Product.findOne({ _id: id, status: 'active' });
  }
  const usr = await User.findOne({ username: user }).populate('cart.product_id');
  if (type === "product") {
    if (!prod || !usr) {
      return { error: "Invalid Request!" };
    }
  }
  if (type === "product") {
    if (usr.cart.length) {
      const c = await User.findOneAndUpdate(
        { _id: usr._id },
        { $pull: { cart: { product_id: prod._id } } }
      );

    }
  } 
  let tot = 0;
  if(type === 'cart') {
    usr.cart.forEach(crt => {
      tot += parseFloat(crt.product_id.price);
    });
  }

  if (parseFloat(type==='product' ? prod.price : tot) !== parseFloat(data.total_amount.replace(',',''))) {
    const order = await Order.create({
      total_amount: data.total_amount,
      user_id: usr._id,
      status: "error",
      products: type === 'product' ? [{ product_id: prod._id }] : usr.cart,
      transaction_code: data.transaction_code,
    });
    return {
      error: `Payment Error, actual price = ${prod.price} / payed price = ${data.total_amount}`,
    };
  }

  const order = await Order.create({
    total_amount: type === 'product' ? prod.price : tot,
    user_id: usr._id,
    products: type === 'product' ? [{ product_id: prod._id }] : usr.cart,
    transaction_code: data.transaction_code,
  });

  if(type === 'product') {
    const p = await Product.findOneAndUpdate({_id: prod._id}, {$set: {status: 'sold'}});
  }

  if(type === 'cart') {
    let p = null;
    usr.cart.forEach(async (crt) => {
      p = await Product.findOneAndUpdate({_id:crt.product_id._id},{$set:{status: 'sold'}});
    });
    const c = await User.findOneAndUpdate({_id:usr._id}, {cart: []});
  }
  return { msg: "success" };
};

const submitOrder = async (req, res) => {
  const { id, user } = req.params;
  const stats = await orderProd(id, user, req.query.data, "product");

  if (stats.error) {
    res.writeHead(301, { Location: process.env.WEB + "?order=" + stats.error });
    res.end();
  } else {
    res.writeHead(301, { Location: process.env.WEB + "?order=success" });
    res.end();
  }
};

const checkout = async (req, res) => {
  const { user } = req.params;
  const stats = await orderProd(null, user, req.query.data, "cart");

  if (stats.error) {
    res.writeHead(301, { Location: process.env.WEB + "?order=" + stats.error });
    res.end();
  } else {
    res.writeHead(301, { Location: process.env.WEB + "?order=success" });
    res.end();
  }
};

const getOrders = async (req, res) => {
  const uid = req.user._id;
  const order = await Order.find({ user_id: uid })
    .populate("products.product_id")
    .sort({ createdAt: -1 });

  res.status(200).json({ msg: "success", order });
};

const cancelOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findOneAndDelete({ _id: id });
  if (!order) {
    return res.status(404).json({ error: "Order not found!" });
  }
  res.status(200).json({ msg: "success", order });
};

const recordOrder = async (req, res) => {
  res.status(200).json({ msg: "success" });
};

module.exports = { submitOrder, recordOrder,checkout, getOrders, cancelOrder };
