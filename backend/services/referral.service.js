const Referral = require("../schemas/referral.schema");
const { v4: uuidv4 } = require('uuid');

let service = {};
service.generateUserReferral = generateUserReferral;
service.checkUserReferral = checkUserReferral;
service.getReferrals = getReferrals;

function generateRandomNumber() {
    const randomUUID = uuidv4();
    const randomNumber = parseInt(randomUUID.slice(0, 6), 16);
    return randomNumber;
}
  
function generateUniqueNumber(existingNumbers) {
    let randomNumber;
    do {
        randomNumber = generateRandomNumber();
    } while (existingNumbers.has(randomNumber)); // Ensure uniqueness
  
    existingNumbers.add(randomNumber); // Add the generated number to the set of existing numbers
    return randomNumber;
}

async function generateUserReferral(userId, referredBy) {
    const existingNumbers = new Set();
    const referralId = generateUniqueNumber(existingNumbers);
    const referredByUser = await Referral.findOne({myReferral: referredBy})
    let userReferral = new Referral({
        userId: userId.toString(),
        myReferral: referralId,
        referredBy: referredByUser.userId
    });
    try {
        await userReferral.save();
        return {saved: true};
    }catch(err){
        console.log('Error saving user data',err);
        return Promise.reject('Error saving user data');
    }
}

async function checkUserReferral(referralId) {
    if (referralId){
        try {
            const data = await Referral.findOne({myReferral: referralId});
            if (data){
                return {ref: referralId};
            }else{
                return Promise.reject({error: "Referrence ID doesn't exist!", field: "ref"});
            }
        }catch(err){
            return Promise.reject("Something went wrong. Try again later!");
        }
    }else{
        return {ref: ""};
    }
}

// async function getReferrals(userId){
//     try{
//         let chain = [];
//         let level = 1;
//         const referral = await Referral.find({ referredBy: userId }).populate('userId');
//         if (referral.length > 0) {
//             chain.push({ users: referral, level });
//             // const nextLevel = level + 1;
//             // const nextUserId = referral.userId._id;
//             // const nextChain = await getReferrals(nextUserId, nextLevel);
//             // chain = chain.concat(nextChain);
//         }
//         return chain;
//     }catch(err){
//         console.log(err)
//         return Promise.reject(err);
//     }
// }


async function getReferrals(userId) {
    try {
        let chain = [];
        let level = 1;
        let currentUsers = [userId]; 

        while (currentUsers.length > 0) {
            const referral = await Referral.find({ referredBy: { $in: currentUsers } }).populate('userId');
            if (referral.length > 0) {
                chain.push({ users: referral, level });

                const userIdsInNextLevel = referral.map(ref => ref.userId._id);
                currentUsers = userIdsInNextLevel;
                level++;
            } else {
                break; 
            }
        }

        return chain;
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}



module.exports = service;

// async function getReferrals(userId){
//     try {
//         const level1 = await Referral.find({ referredBy: userId });
//         if (level1.length > 0){
//             let allReferrals = [];
//             let level2ref = [];
//             allReferrals.push({level: 1, user: level1})
//             for(let i=0; i < level1.length; i++){
//                 if (level1[i].referredBy){
//                     const ifExists = level2ref.includes(level1[i].referredBy.toString())
//                     if (!ifExists){
//                         level2ref.push(level1[i].referredBy.toString());
//                     }
//                 }
//             }
//             if (level2ref.length > 0 ){
//                 for(let i=0; i < level2ref.length; i++){
//                     const level2 = await Referral.findOne({ userId: level2ref[i] });
//                     allReferrals.push({level: 2, user: level2});
//                     let level3ref = [];
//                     if (level2.referredBy){
//                         const ifExists = level2ref.includes(level1[i].referredBy.toString())
//                         if (!ifExists){
//                             level2ref.push(level1[i].referredBy.toString());
//                         }
//                     }
//                 }
//             }
//             return level1;
//         } else {
//             return [];
//         }
//     } catch(err){
//         console.log(err)
//         return Promise.reject(err);
//     }
// }
