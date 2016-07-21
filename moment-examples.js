var moment = require('moment');
var now = moment();

// console.log('-------Date now:----------');
// console.log(now.format());


// //seconds since january 01, 1970, Show Timestamp, outputs string
// console.log('-------seconds since january 01, 1970:----------');
// console.log(now.format('X'));


// //miliseconds since january 01, 1970, Show Timestamp, outputs string
// console.log('-------miliseconds since january 01, 1970:----------');
// console.log(now.format('x'));


//convert into value from string
// console.log('-------convert into value from string:----------');
// var valueFromString = now.valueOf(); 
// console.log(valueFromString);


//Convert from value into moment object with UTC time, it needed to convert into Local Time
console.log('-------Convert from value into moment object with UTC time:----------');
var timestamp = 1469080815175;
var timestampMoment = moment().utc(timestamp);
console.log(timestampMoment.format());

// now.subtract(1, 'month');//substract month
// console.log(now.format());



//format date
console.log('-------Format date and Convert is to Local:----------');
console.log(timestampMoment.local().format('MMM Do YYYY, h:mma'));//Oct 5th 2016, 21:43pm