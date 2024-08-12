const Contact = require('../schemas/contact.schema');


let service = {};
service.getContacts = getContacts;
service.deactivateUsers = deactivateUsers;

async function getContacts(){
    try {
        const Contacts = await Contact.find().sort({ publishedAt: -1 });
        return Contacts;
    } catch (err) {
        return Promise.reject({error: 'Unable to fetch contacts'});
    }
}

async function deactivateUsers(userIds){
    try {
        const response = await Users.updateMany({ _id: { $in: userIds } }, { active: false }, { new: true });
        return response;
    } catch (error) {
        console.log(error);
        return Promise.reject({ error: 'Error changing status of users!' });
    }
}


module.exports = service;