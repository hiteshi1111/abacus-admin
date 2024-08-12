const mongoose = require("mongoose");
const Product = require("../schemas/product.schema");

let service = {};
service.getAllProducts = getAllProducts;
service.createProduct = createProduct;
service.deleteProduct = deleteProduct;
service.updateProduct = updateProduct;

async function getAllProducts() {
    try {
        const users = await Product.find();
        return users;
    }catch{
        return Promise.reject({ error: 'Something went wrong.' });
    }
}

async function createProduct(body) {
    try {
        let data = {
            productTitle: body.productTitle,
            productPrice: body.productPrice,
            rentalAmount: body.rentalAmount,
            rentalDuration: body.rentalDuration,
            noOfBlocks: body.noOfBlocks,
            currency: 'INR'
        }
        let newProduct = new Product(data);
        const product = await newProduct.save();
        return product;
    } catch (e) {
        console.error('Error saving user data');
        return Promise.reject({ error: 'Error saving new product!' });
    }
}

async function deleteProduct(id){
    try {
        const productDeleted = await Product.deleteOne({_id: id});
        return productDeleted;
    }catch(error){
        return Promise.reject({ error: 'Error deleting product!' });
    }
}

async function updateProduct(id, body){
    try {
        const updatedProduct = await Product.findOneAndUpdate({_id: new mongoose.Types.ObjectId(id)}, body, { new: true });
        return updatedProduct;
    }catch(error){
        return Promise.reject({ error: 'Error updating product!' });
    }
}

module.exports = service; 