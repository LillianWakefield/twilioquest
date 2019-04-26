const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');
const app = express();

//Potentially convert between text as numbered list and array
const list = [];

//write function to remove item from list based on number given by user
function removeItem(number) {

};

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  //Specify first word in if statement and rest of body to be added to list 
  if (req.body.Body ==="add") {
    list.push(req.body.Body)
  twiml.message(list);
}

//Specify first word in if statement and potentially change between aray and text here
else if (req.body.Body ==="list") {
  twiml.message(list);
}
//Specify first word in if and change req.body.Number to be a real thing
else if (req.body.Body ==="remove") {
  removeItem(req.body.Number);
  twiml.message(list);
}

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(80, () => {
  console.log('Express server listening on port 80');
});