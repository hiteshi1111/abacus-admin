const express = require('express');
const router = express.Router();

const PaymentService = require('../services/payment.service');

router.put('/paid/:id', async function (req,res) {
    const {transactionId} = req.body
    try {
        const response = await PaymentService.updatePaid(req.params.id, transactionId)
        res.status(200).send(response)
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
})

module.exports = router