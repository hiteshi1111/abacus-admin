const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "Users"},
    productId: {type: mongoose.Schema.Types.ObjectId, ref: "Products"},
    startedOn: {type: Date, default: Date.now},
    endingOn: {type: Date},
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now }
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;