const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
    }, price: {
        type: String,
        required: true,
    }, image: {
        type: String,
        required: false,
    }, status: {
        type: String,
        required: false,
        default: "active"
    }, description: {
        type: String,
        required: false,
    }, signature: {
        type: String,
        required: false,
    }, reviews: [{
        name: String,
        rating: Number,
        review: String,
        status: {
            type: String,
            default: "inactive"
        }
    }]
}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);