const express = require('express')
const app = express()
// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const venom = require('venom-bot');
const port = process.env.PORT || 5000
 
app.get('/', function (req, res) {
  res.send('Hello World')
})

venom
  .create( 'session',
   (base64Qrimg, asciiQR, attempts) => {}, 
   (statusSession, session) => {}, 
   { useChrome: false, browserArgs: ['--no-sandbox'] } )
   .then((client) => start(client))
 
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage((message) => {
    if (message.body === 'Hi' && message.isGroupMsg === false) {
      client
        .sendText(message.from, 'Welcome Venom 🕷')
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }
  });
}
 
app.listen(port, "0.0.0.0")