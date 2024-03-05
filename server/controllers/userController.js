const User = require('../models/user');
const mongoose = require('mongoose');

const userLogin = async (req, res) => {
    res.status(200).json({msg: 'working'});
}

module.exports = { userLogin };