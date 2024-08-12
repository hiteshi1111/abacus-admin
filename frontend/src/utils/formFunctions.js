export function checkEmptyFields(obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && (obj[key] === "" || obj[key] === null)) {
            return true; // At least one field is empty
        }
    }
    return false; // No empty fields found
}

export function validateEmail(email){
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
    if (email.match(validRegex)) {
        return true;
    } else {
        return false;
    }
}

export function validatePan(pan){
    const validRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}/;
    if (pan.match(validRegex)) {
        return true;
    } else {
        return false;
    }
}

export function validateAadhar(aadhar){
    const validRegex = /^[0-9]{12}/;
    if (aadhar.match(validRegex)) {
        return true;
    } else {
        return false;
    }
}

export function validatePhone(phone){
    const validRegex = /^(?!.*(\d)\1{9})[6-9]\d{9}$/;
    if (phone.match(validRegex)) {
        return true;
    } else {
        return false;
    }
}

export function validatePassword(password){
    const validRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (password.length < 8) {
        return false;
    } else if (password.match(validRegex)){
        return true;
    }else{
        return false;
    }
}

export function validateReferrenceId(refId){
    if (refId) {
        if (refId.length < 6) {
            return false;
        } else {
            return true;
        }
    }else{
        return true;
    }
}