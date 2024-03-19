const mongoose = require('mongoose');
const submitOrder = async (req, res) => {
  const {id, user} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({msg: 'Product not found'});
  } if(!mongoose.Types.ObjectId.isValid(user)) {
    return res.status(400).json({msg: 'Invalid user request'});
  }
  // return {msg: 'success', id, user};

  return res.status(200).json({ msg: "success", id, user });
};

const recordOrder = async (req, res) => {
  res.status(200).json({ msg: "success" });
};

module.exports = { submitOrder, recordOrder };
