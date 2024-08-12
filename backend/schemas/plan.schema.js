const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const planSchema = new Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "Users"},
    productId: {type: mongoose.Schema.Types.ObjectId, ref: "Products"},
    isPaid: { type: Boolean, default: false},
    amount: { type: String },
    transactionId: {type: String},
    currency: { type: String, default: "INR" },
    initialDate: { type: Date, default: Date.now },
    finalDate: { type: Date, default: Date.now }
}, { timestamps: true });

const Plans = mongoose.model('Plans', planSchema);

module.exports = Plans;