const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const walletSchema = new Schema({
    amount: {type: String},
    description: {type: string}
}, {timestamp: true})

const Wallet = mongoose.model('Products', walletSchema);

module.exports = Wallet;