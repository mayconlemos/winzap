"use strict";

const venom = require('venom-bot');
const fs = require('fs');
var clientsArray = [];


async function opendata(req, res,sessionName) {


    clientsArray[sessionName] = await venom
    
    .create( sessionName,
     ( base64Qrimg, asciiQR, attempts) => {
        exportQR(req, res, base64Qrimg, sessionName + '.png', sessionName)
     }, 
     (statusSession, session) => {}, 
     { useChrome: false, browserArgs: ['--no-sandbox'] } )
     
     .then((client) => start(client))
   
    .catch((erro) => {
      console.log(erro);
    });

  
}

function exportQR(req, res, qrCode, path, session) {
    qrCode = qrCode.replace('data:image/png;base64,', '');
    const imageBuffer = Buffer.from(qrCode, 'base64');
  
    

    fs.writeFileSync(path, imageBuffer);
    req.io.emit('qrCode',
        {
            data: 'data:image/png;base64,' + imageBuffer.toString('base64'),
            session: session
        }
    );
}


module.exports = {
    async abrirSessao(req, res) {
        const {sessionName} = req.body

        opendata(req, res, sessionName)
    },





    
   

    
}