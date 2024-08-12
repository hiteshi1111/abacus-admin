const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taxSchema = new Schema({
    title: String,
    taxPercentage: Number,
    active: {type: Boolean, default: true},
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now }
});

const Taxes = mongoose.model('Taxes', taxSchema);

module.exports = Taxes;  