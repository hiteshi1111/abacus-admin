const CryptoJS = require("crypto-js");
const algorithm = 'abc-111-def'; //Using AES encryption
const Users = require("../schemas/user.schema");

let service = {};
service.passwordEncryption = passwordEncryption;
service.passwordDecryption = passwordDecryption;
service.verifyPassword = verifyPassword;
service.updatePassword = updatePassword;

async function passwordEncryption(password) {
    try {
        const encryptedData = CryptoJS.AES.encrypt(password, algorithm).toString();
        return {password: encryptedData};
    }catch(err){
        console.log(err)
        return Promise.reject(err);
    }
}

async function passwordDecryption(encryptedData){
    try {
        const bytes  = CryptoJS.AES.decrypt(encryptedData, algorithm);
        const password = bytes.toString(CryptoJS.enc.Utf8);
        return {password: password};
    }catch(err){
        console.log(err)
        return Promise.reject(err);
    }
}

async function verifyPassword(id, pass){
    try {
        const user = await Users.findOne({ _id: id});
        const response = await passwordDecryption(user.password);
        if (response.password === pass){
            return true;
        }else{
            return Promise.reject('Incorrect Old Password');
        }
    } catch (err) {
        return Promise.reject('Something went wrong. Try again later!');
    }
}

async function updatePassword(id, newPass){
    try {
        const resp = await passwordEncryption(newPass);
        Users.findOneAndUpdate({ _id: id }, {password: resp.password}, { new: true }).then(user => {
            return true;
        }).catch(err => {
            return Promise.reject('Unable to update password!');
        });
    } catch (e) {
        console.log('Error saving user data');
        return Promise.reject(e);
    }
}

module.exports = service;