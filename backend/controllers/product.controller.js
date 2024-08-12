const express = require('express');
const router = express.Router();

const ProductService = require('../services/product.service');

router.get('/', function (req, res) {
    ProductService.getAllProducts().then(response => {
        res.status(200).send(response);
    }).catch(error => {
        res.status(400).send(error);    
    })
})

router.post('/', function (req, res) {
    ProductService.createProduct(req.body).then(response => {
        res.status(200).send(response);
    }).catch(error => {
        res.status(400).send(error);    
    })
})

router.post('/update/:id', function(req, res) {
    ProductService.updateProduct(req.params.id, req.body).then(response => {
        res.status(200).send(response);
    }).catch(error => {
        res.status(400).send(error);    
    })
}); 

router.get('/delete/:id', function(req, res) {
    ProductService.deleteProduct(req.params.id).then(response => {
        res.status(200).send(response);
    }).catch(error => {
        res.status(400).send(error);    
    })
}); 

module.exports = router;