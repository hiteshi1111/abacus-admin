export default function convertDate(dateString){
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric', 
        second: 'numeric'
    };
  
    const formattedDate = new Date(dateString).toLocaleString('en-US', options);
    return formattedDate;
}