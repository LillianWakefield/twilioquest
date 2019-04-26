var rightNow = new Date().getTime()

var twilio = require('twilio');

var client = new twilio(accountSid, authToken);

client.messages.create({
    body: 'Greetings! The current time is: ' + rightNow + ' HM249IQBG1U1FYZ',
    to: '+1 209 210 4311',  // Text this number
    from: '+1 415 212 6495' // From a valid Twilio number
})
.then((message) => console.log(message.sid));