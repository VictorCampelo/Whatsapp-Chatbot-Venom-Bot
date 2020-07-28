// Supports ES6
// import { create, Whatsapp } from 'sulla';
const bot = require("venom-bot");
const banco = require("./bd");
const stages = require("./stages");
const fs = require('fs');

// "TESTE" SHOULD RECEIVE THE NAME AND NUMBER'S OWNER
// ALL THIS CODE SHOULD BE ENCAPSULATE IN A FUNCTION AND EXPORT IT
// THE NAME OF QRCODE IMAGE FILE AND JSON QRCODE SHOULD BE RENAME WITH SPECIAL CODE
// QRCODE IMAGE AND QRCODE JSON SHOULD BE STORED TEMPORALLY IN THE DIRECTORY CALLED FILES

bot.create('teste',(base64Qr, asciiQR) => {
  // To log the QR in the terminal
  console.log(asciiQR);
  
  // To write it somewhere else in a file
  exportQR(base64Qr, 'files/marketing-qr.png');
}).then((client) => start(client));

// Writes QR in specified path
function exportQR(qrCode, path) {
  qrCode = qrCode.replace('data:image/png;base64,', '');
  const imageBuffer = Buffer.from(qrCode, 'base64');
  
  // Creates 'marketing-qr.png' file
  fs.writeFileSync(path, imageBuffer);
  
  var jsonContent = JSON.stringify(qrCode);
  
  fs.writeFile("files/output.json", jsonContent, 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }
    
    console.log("JSON file has been saved.");
  });
}

function start(client) {
  client.onMessage((message) => {
    current_stage = getStage(message.from)
    
    let resp = stages.step[current_stage].obj.execute(message.from, message.body, message.sender.name);
    
    for (let index = 0; index < resp.length; index++) {
      const element = resp[index];
      
      //send return from current stage with mensage
      client.sendText(message.from, element);
    }
  });
}

function getStage(user) {
  if (banco.db[user]) {
    //Se existir esse numero no banco de dados
    return banco.db[user].stage;
  } else {
    //Se for a primeira vez que entra e contato
    banco.db[user] = {
      stage: 0,
      itens: [],
      numero: 0,
      preco: 0.0,
      endereco: "",
      valor_troco: 0.0,
      nome: ''
    };
    return banco.db[user].stage;
  }
}
