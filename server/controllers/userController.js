const User = require("../models/user");
const jwt = require("jsonwebtoken");

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
    return res.status(200).json({ email: user.email, username: user.username, token,userType: user.userType, cart: user.cart });
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
    return res.status(200).json({ email, token, username,userType: 'customer', cart: [] });
  } catch (err) {}
};

const userUpdate = async (req, res) => {
  const {name, phone} = req.body;
  const _id = req.user._id; 
  try {
    const user = await User.findOneAndUpdate({_id},{$set: {name, phone}})
    if(!user) {
      return res.status(404).json({msg: 'User not found!'});
    }

    res.status(200).json({msg: 'success', user});
  } catch (err) {
    res.status(400).json({error: err.message});
  }
}

const getData = async (req, res) => {
  const _id = req.user._id;
  try {
    const user = await User.findOne({_id});
    if(!user) {
      return res.status(404).json({error: 'user not found'});
    }
    res.status(200).json(user);
  } catch(err) {
    res.status(400).json({error: err.message});
  }
}

const delUser = async (req, res) => {
  // const user  = await User.deleteMany({});
  res.status(200).json({ msg: "user deactivated!" });
};

module.exports = { userLogin, delUser, userSignup, userUpdate, getData };
