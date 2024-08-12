const Taxes = require("../schemas/tax.schema");

let service = {};
service.addTax = addTax;
service.getTaxes = getTaxes;
service.deactivateTax = deactivateTax;

async function addTax(body){
    try {
        let data = {
            title: body.title,
            taxPercentage: body.taxPercentage
        }
        let newTax = new Taxes(data);
        const tax = await newTax.save();
        return tax;
    } catch (err) {
        return Promise.reject({error: 'Something went wrong. Try again later!'});
    }
}

async function getTaxes(){
    try {
        const taxes = await Taxes.find({active: true}).sort({ createdAt: -1 });   ;
        return taxes;
    } catch (err) {
        return Promise.reject({error: 'Unable to fetch all taxes!'});
    }
}

async function deactivateTax(id){
    try {
        const response = await Taxes.updateOne({ _id: id }, { active: false }, { new: true });
        return response;
    } catch (error) {
        console.log(error);
        return Promise.reject({ error: 'Error while deactivating tax!' });
    }
}

module.exports = service;