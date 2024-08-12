const express = require('express');
const router = express.Router();

const PasswordService = require('../services/password.service');

router.put('/:id', function (req, res) {
    const { oldPass, newPass } = req.body;
    PasswordService.verifyPassword(req.params.id, oldPass).then(response => {
        PasswordService.updatePassword(req.params.id, newPass).then(response => {
            res.status(200).send(response);
        }).catch(error => {
            res.status(400).send(error);    
        })
    }).catch(error => {
        console.log(error) 
        res.status(500).send(error);   
    })
})

module.exports = router;