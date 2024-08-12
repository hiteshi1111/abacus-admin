export function encryption(data){
    const key = 111;
    return data ^ key;
}

export function decryption(encryptedData){
    const key = 111;
    return encryptedData ^ key;
}