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
        default: "active"
    }, description: {
        type: String,
        required: false,
    }, reviews: [{
        name: String,
        rating: Number,
    }]
}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);