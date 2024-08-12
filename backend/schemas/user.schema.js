const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    role: { type: String, default: 'customer'},
    fullName: String,
    email: { type: String, required: true },
    emailVerified: { type: Boolean, default: false},
    stdCode: { type: String, default: "+91"},
    phone: String,
    phoneVerified: { type: Boolean, default: false},
    aadharNumber: String,
    aadharVerified: { type: Boolean, default: false},
    panNumber: String,
    panVerified: { type: Boolean, default: false},
    password: String,
    fullAddress: String,
    state: String,
    country: { type: String, default: 'India'},
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now },
    active: { type: Boolean, default: true},
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;