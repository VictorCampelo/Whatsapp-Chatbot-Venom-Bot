// Supports ES6
// import { create, Whatsapp } from 'sulla';
const bot = require("venom-bot");
const banco = require("./banco");
const stages = require("./stages");
const fs = require('fs');

bot.create('teste',(base64Qr, asciiQR) => {
  // To log the QR in the terminal
  console.log(asciiQR);
  
  // To write it somewhere else in a file
  exportQR(base64Qr, 'marketing-qr.png');
}).then((client) => start(client));

// Writes QR in specified path
function exportQR(qrCode, path) {
  qrCode = qrCode.replace('data:image/png;base64,', '');
  const imageBuffer = Buffer.from(qrCode, 'base64');
  
  // Creates 'marketing-qr.png' file
  fs.writeFileSync(path, imageBuffer);
  console.log(path)
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
