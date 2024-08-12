const axios = require("axios");
const nodemailer = require("nodemailer");
const Users = require("../schemas/user.schema");
const Referrals = require('../schemas/referral.schema');
const PasswordService = require('./password.service');

let service = {};
service.userSave = userSave;
service.phoneVerification = phoneVerification;
service.emailVerification = emailVerification;
service.getUserData = getUserData;
service.verifyLogin = verifyLogin;
service.panVerification = panVerification;
service.aadharVerification = aadharVerification;
service.getAllUsers = getAllUsers;
service.deactivateUsers = deactivateUsers;
service.activateUsers = activateUsers;
service.updateUserData = updateUserData;
service.sendOtp = sendOtp;

//save user into MongoDB
async function userSave(body) {
    const {fullName, email, phone, aadharNumber, panNumber, password, state, aadharStatus, panStatus, stdCode} = body;
    try {
        const resp = await PasswordService.passwordEncryption(password);
        let data = {
            fullName: fullName,
            email: email,
            phone: phone,
            aadharNumber: aadharNumber,
            panNumber: panNumber,
            password: resp.password,
            state: state,
            aadharVerified: aadharStatus,
            panVerified: panStatus,
            stdCode: stdCode
        }
        let newUser = new Users(data);
        const user = await newUser.save();
        return {userId: user._id};
    } catch (e) {
        console.log('Error saving user data');
        return Promise.reject(e);
    }
}

// verifies phone number
async function phoneVerification(){
    const options = {
        method: 'POST',
        url: 'https://api.sendchamp.com/api/v1/sms/send',
        headers: {
            Accept: 'application/json,text/plain,*/*',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.SENDCHAMP_ACCESS_TOKEN}`,
        },
        data: {
            to: '+919682148712',
            message: 'TESTING SMS ALERT!',
            sender_name: 'SAlert',
            route: 'dnd',
        },
    };
    axios(options).then(response => {
        return response.data;
    }).catch(error => {
        console.error(error);
        return Promise.reject(error);
    });
}

// retrieves user data
async function getUserData(email){
    try {
        const user = await Users.findOne({email: email});
        if (user){
            if (user.active){
                return user;
            }else{
                return Promise.reject('Contact administrator to activate your account');
            }
        }else{
            return Promise.reject('Account not found');
        }
    }catch(err){
        console.error('Error retrieving user data', err);
        return Promise.reject('Error retrieving user data');
    }
}

// retrieves user data
async function getAllUsers(id){
    try {
        const users = await Users.find({ _id: {$ne: id} }).select("-password");
        return users.length > 0 ? users : [];
    }catch{
        return Promise.reject('Error retrieving all user');
    }
}

async function verifyLogin(email, password){
    try {
        const user = await Users.findOne({ email: email});
        const response = await PasswordService.passwordDecryption(user.password);
        if (response.password === password){
            const referral = await Referrals.findOne({userId: user._id.toString()});
            const data = {
                userId: user._id,
                fullName: user.fullName,
                aadharNumber: user.aadharNumber,
                panNumber: user.panNumber,
                fullAddress: user.fullAddress,
                state: user.state,
                country:  user.country,
                myReferral: referral ? referral.myReferral : "",
                referredBy: referral ? referral.referredBy : "",
                email: user.email,
                role: user.role
            }
            return {loggedIn: true, data: data};
        }else{
            return Promise.reject('Incorrect Password');
        }
    } catch (err) {
        console.log(err)
        return Promise.reject(err);
    }
}

// verifies email
async function emailVerification(email){
    try {
        const user = await Users.findOne({email: email});
        if (user){
            return Promise.reject({error: 'Account already exists!', field: "email"});
        }else{
            return true;
        }
    }catch(err){
        console.error('Error retrieving user data', err);
        return Promise.reject(err);
    }
}

// send OTP to email
async function sendOtp(email){
    const otp = generateRandomSixDigitNumber();
    const emailTemplate = `
    <html>
        <head>
            <style>
                .title {
                    color: #000;
                    font-weight: 900;
                    font-family: cursive;
                }
                h2, h1{
                    color: #000244;
                }
                .wrapper {
                    background: #000244;
		            padding: 50px;
                }
                .container {
                    max-width: 600px;
                    margin: auto;
                    background: #fff;
                    text-align: center;
                }
                p {
                    text-align: center;
                    color: #000244;
                }
                .box {
                    border: 1px solid #dddddd;
                    padding: 10px;
                    margin-top: 30px;
                }
                img {
                    width: 80px;
                    margin: auto;
                    background-color: transparent;
                }
                .logo {
                    display: flex;
                    justify-center: center;
                    align-items: center;
                }
            </style>
        </head>	
        <body>
            <div class="wrapper">
                <div class="logo">
                    <img
                        src="https://www.theabacus.in/static/664e4f6f52fe0ac8d529e4c641928962/c0d3d/abacus.webp"
                        alt="logo"
                    />
                </div>
                <div class="container">
                    <div class="box">
                        <h2>Here is your One Time Password</h2>
                        <p>to validate your email address</p>
                        <h1>${otp}</h1>
                    </div>
                </div>
            </div>
        </body>
    </html>
    `;
    try{
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.GOOGLE_MAIL,
                pass: process.env.GOOGLE_PASS
            }
        });
        const mailOptions = {
            from: process.env.GOOGLE_MAIL,
            to: email,
            subject: `Verify your email - Abacus Cloud`,
            html: emailTemplate
        };
        await transporter.sendMail(mailOptions);
        return otp;
    }catch(err){
        console.log(">>>", err)
        return Promise.reject(err);
    }
}

//generates random number
function generateRandomSixDigitNumber() {
    // Generate a random number between 100,000 and 999,999
    return Math.floor(100000 + Math.random() * 900000);
}

//validates and verifies pan number
async function panVerification(pan){
    try {
        const response = await axios.post(process.env.SUREPASS_PAN_URL, {
            "id_number": pan
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.SUREPASS_TOKEN}`,
                'Content-Type': 'application/json'
            },
        });
        return { validated: true, userData: response.data.data };
    } catch (error) {
        if (error.response.status === 422){
            return Promise.reject({ error: 'Incorrect PAN number!', field: "pan" });
        }else{
            return { validated: false };
        }
    }
}

//validates and verifies aadhar number
async function aadharVerification(aadhar){
    try {
        const response = await axios.post(process.env.SUREPASS_AADHAR_URL, {
            "id_number": aadhar
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.SUREPASS_TOKEN}`,
                'Content-Type': 'application/json'
            },
        });
        return { validated: true, userData: response.data.data };
    } catch (error) {
        if (error.response.status === 422){
            return Promise.reject({ error: 'Incorrect Aadhar number!', field: "aadhar" });
        }else{
            return { validated: false };
        }
    }
}

//deactivates multiple users
async function deactivateUsers(userIds){
    try {
        const response = await Users.updateMany({ _id: { $in: userIds } }, { active: false }, { new: true });
        return response;
    } catch (error) {
        console.log(error);
        return Promise.reject({ error: 'Error changing status of users!' });
    }
}

//activates multiple users
async function activateUsers(userIds){
    try {
        const response = await Users.findOneAndUpdate({ _id: { $in: userIds } }, { active: true }, { new: true });
        return response;
    } catch (error) {
        console.log(error);
        return Promise.reject({ error: 'Error changing status of users!' });
    }
}

//updates user data
async function updateUserData(id, body){
    try {
        const response = await Users.findOneAndUpdate({ _id: id }, body, { new: true });
        return response;
    } catch (error) {
        console.log(error);
        return Promise.reject({ error: 'Error changing status of users!' });
    }
}

module.exports = service;