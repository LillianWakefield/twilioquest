const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');
const app = express();

//Defines global message variables
let outgoingArray = [];
let outgoingMessage = [];
let toDoList = ''

//Formats todo list to return to user
function formatAray(){
  for(i = 0; i < outgoingArray.length; i++) {
    outgoingMessage.push((i+1) + '. ' + outgoingArray[i] + '\n');
  }
  toDoList =  'Here is what you need to do today: \n' + outgoingMessage.join('');
}
//Adds a new item to the todo list
function addItem (newItem){
  outgoingMessage = [];
  toDoList = ''
  outgoingArray.push(newItem);
  formatAray();
}
//Removes item from list based on number given by user
function removeItem(number) {
  outgoingMessage = [];
  toDoList = ''
  outgoingArray.splice(number - 1, 1)
  formatAray();
}

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();
  const incomingArray = req.body.Body.split(' ');

//Adds todo item to list and returns numbered list 
    if (incomingArray[0] === "add") {
      const textBody = incomingArray.slice(1).join(' ');
      addItem(textBody);
      twiml.message(toDoList);
  }
  
//Returns todo list
else if (incomingArray[0] === "list") {
  twiml.message(toDoList);
}

//Removes item from todo list based on user input
else if (incomingArray[0] ==="remove") {
  removeItem(incomingArray[1]);
  twiml.message(toDoList);
}

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(80, () => {
  console.log('Express server listening on port 80');
});