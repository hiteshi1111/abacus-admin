const axios = require("axios");
const sha512 = require('js-sha512');
const { randomBytes } = require('crypto');
const Plans = require('../schemas/plan.schema');


let service = {};
service.createPayment = createPayment;
service.updatePaid = updatePaid

async function createPayment(fullName, email, phone, transactionAmount){
    try {
      const key = process.env.EASEBUZZ_KEY;  
      const salt = process.env.EASEBUZZ_SALT;
      const productinfo = 'Abacus Cloud Testing';
      const udf = {
        udf1 : "",
        udf2 : "",
        udf3 : "",
        udf4 : "",
        udf5 : "",
        udf6 : "",
        udf7 : "",
        udf8 : "",
        udf9 : "",
        udf10 : "",
      }
      const transactionId = generateUniqueId();
      const hashString = key + '|' + transactionId + '|' + transactionAmount + '|' + productinfo + '|' + fullName + '|' + email + '|' + udf.udf1 + '|' + udf.udf2 + '|' + udf.udf3 + '|' + udf.udf4 + '|' + udf.udf5 + '|' + udf.udf6 + '|' + udf.udf7 + '|' + udf.udf8 + '|' + udf.udf9 + '|'+ udf.udf10 + '|' + salt;
      const hash = sha512.sha512(hashString);
      
      const options = {
        method: 'POST',
        url: process.env.EASEBUZZ_URL,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
            key: key,
            txnid: transactionId,
            amount: transactionAmount,
            productinfo: productinfo,
            firstname: fullName,
            phone: phone,
            email: email,
            surl: 'https://www.kalmaashi.com/',
            furl: 'https://www.kalmaashi.com/',
            hash: hash,
            udf1: udf.udf1,
            udf2: udf.udf2,
            udf3: udf.udf3,
            udf4: udf.udf4,
            udf5: udf.udf5,
            udf6: udf.udf6,
            udf7: udf.udf7,
            udf8: udf.udf8,
            udf9: udf.udf9,
            udf10: udf.udf10
        }
      };
      const response = await axios.request(options);
      return response.data; 
    } catch (err) {
      console.log('Error getting payments', err);
      return Promise.reject('Error getting payments');
    }
}

function generateUniqueId() {
    const now = Date.now().toString().slice(-5);
    const random = randomBytes(2).toString('hex').slice(0, 5);
    return now + random;
}

async function updatePaid(id, transactionId){
    try {
      const updatedData = await Plans.findOneAndUpdate(
        { _id: id },
        { isPaid: true, transactionId:  transactionId},
        { new: true } 
    );
      return updatedData
    } catch (err) {
      console.log('Error paying for plan', err);
      return Promise.reject('Error paying for plan');
    }   
}

module.exports = service