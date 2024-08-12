const express = require('express');
const router = express.Router();

const TaxService = require('../services/tax.service');

router.post('/', function (req, res) {
    TaxService.addTax(req.body).then(response => {
        res.status(200).send(response);
    }).catch(error => {
        res.status(400).send(error);    
    })
})

router.get('/', function (req, res) {
    TaxService.getTaxes().then(response => {
        res.status(200).send(response);
    }).catch(error => {
        res.status(400).send(error);    
    })
})

router.get('/deactivate/:id', function(req, res) {
    TaxService.deactivateTax(req.params.id).then(response => {
        res.status(200).send(response);
    }).catch(error => {
        res.status(400).send(error);
    })
}); 

module.exports = router;