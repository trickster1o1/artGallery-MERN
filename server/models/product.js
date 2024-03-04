const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
    }, price: {
        type: String,
        required: true,
    }, status: {
        type: String,
        required: false,
    }, description: {
        type: String,
        required: false,
    }
}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);