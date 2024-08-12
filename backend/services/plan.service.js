const Plans = require("../schemas/plan.schema");
const Plan = require("../schemas/plan.schema");
const Products = require("../schemas/product.schema");
const Users = require("../schemas/user.schema");

let service = {};
service.createPlan = createPlan;
service.buyPlan = buyPlan;
service.getUserPlans = getUserPlans;
service.getPlans = getPlans

async function createPlan(body, user) {
    try {
        body.userId = user._id;
        let newPlan = new Plan(body);

        const currentDate = new Date();
        const finalYear = currentDate.getFullYear() + 10;
        
        const finalDate = new Date(currentDate);
        finalDate.setFullYear(finalYear);
 
        newPlan.initialDate = currentDate;
        newPlan.finalDate = finalDate;

        const plan = await newPlan.save();
        const amount = plan ? await productPrice(plan.productId) : 0;
        return { planId: plan._id, amount: amount };
    } catch (err) {
        console.log(err)
        return Promise.reject('Something went wrong. Try again later!' );
    }
}

async function productPrice(id){
    try {
        const data = await Products.findOne({_id: id})
        return data.productPrice
    } catch (err) {
        console.log(err)
        return Promise.reject('Something went wrong. Try again later! ')
    }
}

async function buyPlan(id, body) {
    try {
        const plan = await Plan.findOneAndUpdate({ _id: id }, body, { new: true });
        return plan;
    }catch(err){
        console.log('Error paying for plan', err);
        return Promise.reject('Error paying for plan');
    }     
}

function addTenYears(dateString) {
    // Parse the input date string
    const date = new Date(dateString);

    // Add 10 years to the date
    date.setFullYear(date.getFullYear() + 10);

    // Format the date as an ISO 8601 string
    const result = date.toISOString();

    return result;
}

async function getUserPlans(id) {
    try {
        const data = await Plan.find({userId: id, isPaid: true}).populate('productId')
        return data
    } catch (err) {
        console.log('Error getting user plans', err);
        return Promise.reject('Error getting user plans');
    }
}

async function getPlans() {
    try {
        const data = await Users.find({ role: { $ne: 'admin' }, active: true }).select('_id fullName');
        const result = [];
        for (const user of data) {
            const userPlans = await Plans.find({ userId: user._id })
            .populate({
                path: 'userId',
                select: 'fullName email'
            })
            .populate({
                path: 'productId',
                select: 'productPrice productTitle'
            });
            result.push({ userId: user.fullName, plans: userPlans });
        }
        return result
    } catch (error) {
        console.log('Error getting plans', err);
        return Promise.reject('Error getting plans');
    }
}


module.exports = service; 