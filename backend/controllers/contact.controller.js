const express = require('express');
const router = express.Router();

const ContactService = require('../services/contact.service');

router.get('/getContacts', function (req, res) {
    ContactService.getContacts().then(response => {
        res.status(200).send(response);    
    }).catch(error => {
        res.status(500).send(error);    
    })
})
router.post('/deactivate', function(req, res) {
    UserService.deactivateUsers(req.body.userIds).then(response => {
        res.status(200).send(response);
    }).catch(error => {
        res.status(400).send(error);
    })
}); 
module.exports = router;