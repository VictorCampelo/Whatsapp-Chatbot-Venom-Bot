const bot = require("venom-bot");
const banco = require("./bd");
const stages = require("./stages");
const fs = require('fs');
const path = require('path');
const client = require('../helpers/init_redis');
const { qrcode } = require("../controllers/userController");
const db = require("../database");
const User = require("../models/User");

const config = {
  headless: true, // Headless chrome
  devtools: false, // Open devtools by default
  useChrome: true, // If false will use Chromium instance
  debug: false, // Opens a debug session
  logQR: true, // Logs QR automatically in terminal
  browserArgs: [''], // Parameters to be added into the chrome browser instance
  refreshQR: 15000, // Will refresh QR every 15 seconds, 0 will load QR once. Default is 30 seconds
  autoClose: 180000, // Will auto close automatically if not synced, 'false' won't auto close. Default is 60 seconds (#Important!!! Will automatically set 'refreshQR' to 1000#)
  disableSpins: true, // Will disable Spinnies animation, useful for containers (docker) for a better log
}

var qrCodeRecent = "";

// "TESTE" SHOULD RECEIVE THE NAME AND NUMBER'S OWNER
// ALL THIS CODE SHOULD BE ENCAPSULATE IN A FUNCTION AND EXPORT IT
// THE NAME OF QRCODE IMAGE FILE AND JSON QRCODE SHOULD BE RENAME WITH SPECIAL CODE
// QRCODE IMAGE AND QRCODE JSON SHOULD BE STORED TEMPORALLY IN THE DIRECTORY CALLED FILES

process.on('message', message => {
  const result = executeBot(message);
  //process.send(result);
});

async function executeBot(userId) {
  try {
    userIdString = userId.toString();

    const owner = await User.findByPk(userId, {
      include: { association: "products" }
    });

    bot.create(userIdString, (base64Qr, asciiQR) => {exportQR(base64Qr, userIdString)}, (statusFind) => {}, config)
    .then((client) => {
      deleteQrcode(userIdString)
      start(client, owner);
    })
    .catch((erro) => {
      deleteQrcode(userIdString)
      console.log("Exiting...!")
      process.exit()
    })
  } catch (error) {
    console.log(error)
  }
}

async function exportQR(base64Qr, userId){
  const qrCode = base64Qr.replace('data:image/png;base64,', '');
  const jsonContent = JSON.stringify(qrCode);
  //SAVE IN REDIS HERE
  if (jsonContent != qrCodeRecent) {
    await client.SET(userId+'qrcode', jsonContent, (err, reply) => {
      if (err) {
        console.log(err.message)
        reject(createError.InternalServerError())
        return
      }
      qrCodeRecent = jsonContent
    }) 
  }
}

async function deleteQrcode(userId) {
  await client.DEL(userId+'qrcode', (err, val) => {
    if (err) {
      createError.InternalServerError()
    }
  })
}


//THIS LOGIC CAN ONLY BE PERFORMED WHEN USER HAS MADE THE PAYMENT 
function start(client, owner) {
  client.onMessage((message) => {
    current_stage = getStage(message.from)
    
    let resp = stages.step[current_stage].obj.execute(message.from, message.body, message.sender.name, owner);
    
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
