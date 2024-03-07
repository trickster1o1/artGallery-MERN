const User = require("../models/user");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login({ email, password });
    if (user.msg) {
      return res.status(400).json(user);
    }

    const token = createToken(user._id);
    return res.status(200).json({ email: user.email, username: user.username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const userSignup = async (req, res) => {
  const { email, password, phone, username, name } = req.body;

  try {
    const user = await User.signup({ email, password, name, username, phone });
    if (user.msg) {
      return res.status(400).json(user);
    }

    const token = createToken(user._id);
    return res.status(200).json({ email, token });
  } catch (err) {}
};

const delUser = async (req, res) => {
  // const user  = await User.deleteMany({});
  res.status(200).json({ msg: "user deactivated!" });
};

const getUsers = async (req, res) => {
  const user = await User.find({});
  res.status(200).json(user);
};

module.exports = { userLogin, delUser, userSignup, getUsers };
