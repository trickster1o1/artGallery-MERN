const Product = require("../models/product");
const mongoose = require("mongoose");

const getProducts = async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 });
  res.status(200).json(products);
};

const postProduct = async (req, res) => {
  const { title, price, description } = req.body;
  try {
    const product = await Product.create({
      title,
      price,
      description,
      status: "active",
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getProducts, postProduct };
