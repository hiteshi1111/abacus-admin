export const money = (number) => {
    let currency = "₹";
    if (typeof number === "string"){
        const num = parseInt(number);
        return currency + " " + new Intl.NumberFormat('en-IN').format(num) + "/-";
    }else{
        return currency + " " + new Intl.NumberFormat('en-IN').format(number) + "/-";
    }
}
