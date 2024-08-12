const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productTitle: String,
    productPrice: Number,
    noOfBlocks: Number,
    rentalAmount: String,
    rentalDuration: String,
    currency: { type: String, default: "INR"},
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now }
});

const Products = mongoose.model('Products', productSchema);

module.exports = Products;