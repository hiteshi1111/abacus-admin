const express = require('express');
const router = express.Router();

const UserService = require('../services/user.service');
const ReferralService = require('../services/referral.service');
const PasswordService = require('../services/password.service');

//verifies and validates user data
router.post('/register', (req, res) => {
    const { referredBy, email, phone, aadhar, pan } = req.body;
    UserService.emailVerification(email).then(response => {
        ReferralService.checkUserReferral(referredBy).then(function(response) {
            const referredBy = response.ref;
            UserService.panVerification(pan).then(resp => {
                const fullName = resp.userData.full_name || "";
                const panStatus = resp.validated;
                UserService.aadharVerification(aadhar).then(async resp => {
                    const aadharStatus = resp.validated;
                    const state = resp.userData.state;
                    UserService.sendOtp(email).then(async otp => {
                        const data = {
                            referredBy: referredBy,
                            email: email,
                            phone: phone,
                            aadharNo: aadhar,
                            pan: pan,
                            fullName: fullName,
                            aadharVerified: aadharStatus,
                            panVerified: panStatus,
                            state: state,
                            otp: otp
                        }
                        res.status(200).send(data);
                    }).catch(err => {
                        console.log("OTP >", err)
                        res.status(400).send(err);
                    });
                }).catch(err => {
                    console.log("adfhar >", err)
                    res.status(400).send(err);
                });
            }).catch(err => {
                console.log("pan >", err)
                res.status(400).send(err);
            });
        }).catch(err => {
            console.log("ref >", err)
            res.status(400).send(err);
        })
    }).catch(err => {
        console.log("email >", err)
        res.status(400).send(err);
    });
});

//saves user data
router.post('/save', function(req, res) {
    UserService.userSave(req.body).then(response => {
        ReferralService.generateUserReferral(response.userId, req.body.referredBy).then(resp => {
            res.status(200).send(resp);
        }).catch(error => {
            res.status(400).send(error);
        })
    }).catch(error => {
        res.status(400).send(error);
    })
});

//fetches user data
router.get('/', function(req, res) {
    UserService.getUserData(req.query.email).then(response => {
        res.status(200).send(response);
    }).catch(error => {
        res.status(400).send(error);
    })
});

//login
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserService.getUserData(email).then(result => {
        UserService.verifyLogin(email, password).then(response => {
            res.status(200).send(response);
        }).catch(error => {
            res.status(400).send(error);    
        })
    }).catch(error => {
        res.status(400).send(error);
    });
});

router.post('/panValidation', async function (req, res) {
    UserService.panValidationVerification(req.body.pan).then(function(result) {
        res.status(200).send(result);
    }).catch(function(err) {
        res.status(400).send(err);
    });
});

router.post('/aadharValidation', async function (req, res) {
    UserService.aadharValidationVerification(req.body.aadhar).then(function(result) {
        res.status(200).send(result);
    }).catch(function(err) {
        res.status(400).send('Something went wrong. Try again later!');
    });
});

router.get('/phoneVerification', function(req, res) {
    UserService.phoneVerification(req.body.phone).then(response => {
        res.status(200).send(response);
    }).catch(error => {
        res.status(400).send(error);
    })
});

router.get('/sendOtp', function(req, res) {
    const {email, otp} = req.body;
    UserService.emailVerification(email, otp).then(response => {
        res.status(200).send(response);
    }).catch(error => {
        res.status(400).send(error);
    })
});

//fetches all users
router.get('/all/:id', function(req, res) {
    UserService.getAllUsers(req.params.id).then(response => {
        res.status(200).send(response);
    }).catch(error => {
        res.status(400).send(error);
    })
});

//deactivate single user
router.get('/deactivate/:userIds', function(req, res) {
    UserService.deactivateUsers(req.params.userIds).then(response => {
        res.status(200).send(response);
    }).catch(error => {
        res.status(400).send(error);
    })
}); 

//deactivate multiple user
router.post('/deactivate', function(req, res) {
    UserService.deactivateUsers(req.body.userIds).then(response => {
        res.status(200).send(response);
    }).catch(error => {
        res.status(400).send(error);
    })
}); 

router.get('/reactivate/:userIds', function(req, res) {
    UserService.activateUsers(req.params.userIds).then(response => {
        res.status(200).send(response);
    }).catch(error => {
        res.status(400).send(error);
    })
}); 

router.post('/update/:id', function(req, res) {
    UserService.updateUserData(req.params.id, req.body).then(response => {
        res.status(200).send(response);
    }).catch(error => {
        res.status(400).send(error);
    })
}); 

router.post('/add',(req, res) => {
    const { fullName, email, emailVerified, phone, phoneVerified, aadharNumber, panNumber, password } = req.body;
    UserService.emailVerification(email).then(response => {
        UserService.panVerification(panNumber).then(resp => {
            const verifiedName = resp.userData.full_name || "";
            const panStatus = resp.validated;
            UserService.aadharVerification(aadharNumber).then(resp => {
                const aadharStatus = resp.validated; 
                const verifiedState = resp.userData.state || "";
                PasswordService.passwordEncryption(password).then(resp => {
                    const data = {
                        email: email,
                        emailVerified: emailVerified,
                        phone: phone,
                        aadharNumber: aadharNumber,
                        panNumber: panNumber,
                        password: resp.password,
                        fullName: verifiedName || fullName,
                        aadharVerified: aadharStatus,
                        panVerified: panStatus,
                        phoneVerified: phoneVerified,
                        state: verifiedState
                    }
                    UserService.userSave(data).then(response => {
                        ReferralService.generateUserReferral(response.userId, req.body.referredBy || "").then(resp => {
                            res.status(200).send(resp);
                        }).catch(error => {
                            res.status(400).send(error);
                        })
                    }).catch(error => {
                        res.status(400).send(error);
                    })
                }).catch(function(err) {
                    res.status(400).send(err);
                });
            }).catch(err => {
                console.log("adfhar >", err)
                res.status(400).send(err);
            });
        }).catch(err => {
            console.log("pan >", err)
            res.status(400).send(err);
        });
    }).catch(err => {
        console.log("email >", err)
        res.status(400).send(err);
    });
});

module.exports = router;