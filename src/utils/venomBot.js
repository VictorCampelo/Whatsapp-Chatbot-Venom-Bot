const bot = require("venom-bot");
const banco = require("./bd");
const stages = require("./stages");
const fs = require('fs');
const path = require('path');

const config = {
  headless: true, // Headless chrome
  devtools: false, // Open devtools by default
  useChrome: true, // If false will use Chromium instance
  debug: false, // Opens a debug session
  logQR: false, // Logs QR automatically in terminal
  browserArgs: [''], // Parameters to be added into the chrome browser instance
  refreshQR: 5000, // Will refresh QR every 15 seconds, 0 will load QR once. Default is 30 seconds
  autoClose: 15000, // Will auto close automatically if not synced, 'false' won't auto close. Default is 60 seconds (#Important!!! Will automatically set 'refreshQR' to 1000#)
  disableSpins: true, // Will disable Spinnies animation, useful for containers (docker) for a better log
}

// "TESTE" SHOULD RECEIVE THE NAME AND NUMBER'S OWNER
// ALL THIS CODE SHOULD BE ENCAPSULATE IN A FUNCTION AND EXPORT IT
// THE NAME OF QRCODE IMAGE FILE AND JSON QRCODE SHOULD BE RENAME WITH SPECIAL CODE
// QRCODE IMAGE AND QRCODE JSON SHOULD BE STORED TEMPORALLY IN THE DIRECTORY CALLED FILES

function executeBot(userId) {
  try {
    bot.create(userId, (base64Qr, asciiQR) => {exportQR(base64Qr, userId)}, (statusFind) => {}, config)
    .then((client) => {
      start(client);
    })
    .catch((erro) => {
      console.log("aqui foi erro!!!")
      console.log(erro)
      process.exit()
    })
  } catch (error) {
    console.log(error)
  }
}


process.on('message', message => {
  const result = executeBot(message);
  //process.send(result);
});

function exportQR(base64Qr, userId){
  const jsonpath = path.join(__dirname, 'files/'+userId+'output.json')
  const qrCode = base64Qr.replace('data:image/png;base64,', '');
  const jsonContent = JSON.stringify(qrCode);
  //SAVE IN REDIS HERE
  fs.writeFile(jsonpath, jsonContent, 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }
  });
}


//THIS LOGIC CAN ONLY BE PERFORMED WHEN USER HAS MADE THE PAYMENT 
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
