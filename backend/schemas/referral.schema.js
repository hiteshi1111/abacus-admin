const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const referralSchema = new Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "Users"},
    referredBy: {type: mongoose.Schema.Types.ObjectId, ref: "Users"}, 
    myReferral: String,
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now }
});

const Referrals = mongoose.model('Referrals', referralSchema);

module.exports = Referrals;