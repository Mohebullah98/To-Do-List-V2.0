module.exports=getDate;
function getDate(){//get current day with month and year
let today = new Date();
let currentDay = today.getDay();
let options ={ weekday:'long',month:'long',day:'numeric'};
let day =today.toLocaleDateString("en-US",options);
return day;
}
