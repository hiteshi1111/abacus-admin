const express = require('express');
const router = express.Router();

const ReferralService = require('../services/referral.service');

router.get('/:id', function (req, res) {
    ReferralService.getReferrals(req.params.id).then(response => {
        res.status(200).send(response);
    }).catch(error => {
        res.status(500).send(error);    
    })
})

module.exports = router;