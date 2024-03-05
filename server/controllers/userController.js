const User = require('../models/user');
const mongoose = require('mongoose');

const userLogin = async (req, res) => {
    const user  = await User.find({});
    res.status(200).json(user);
}

const delUser = async (req, res) => {
    // const user  = await User.deleteMany({});
    res.status(200).json({msg: 'user deactivated!'});
}

module.exports = { userLogin, delUser };