const express = require('express');
const router = express.Router();

const PlanService = require('../services/plan.service');
const PaymentService = require('../services/payment.service');
const User = require("../schemas/user.schema");

router.put('/:id', async function (req, res) {
    try {
        const user = await User.findOne({ _id: req.params.id })
        if (user) {
            try {
                const response = await PlanService.createPlan(req.body, user);
                const paymentToken = await PaymentService.createPayment(user.fullName, user.email, user.phone, response.amount)
                const data = {
                    planId: response.planId,
                    amount: response.amount,
                    token: paymentToken.data
                }
                res.status(200).send(data);
            }catch(err) {
                console.log(err)
                res.status(500).send(err);
            }
        }else{
            res.status(200).send();
        }
    }catch(error){
        console.log(error)
        res.status(500).send(error);
    }
})

router.get('/:id', async function (req, res) {
        PlanService.getUserPlans(req.params.id).then((response) => {
            res.status(200).send(response)
        }).catch((error) => {
            res.status(500).send(error);
        })
})

router.get('/', async function (req,res) {
    PlanService.getPlans().then((response) => {
        res.status(200).send(response)
    }).catch((error) => {
        res.status(500).send(error);
    })
})
module.exports = router;