// Supports ES6
// import { create, Whatsapp } from 'sulla';
const bot = require("venom-bot");
const banco = require("./banco");
const stages = require("./stages");
let moment = require("moment")
const enviar_senha = require('./enviar_senha')
require('moment/locale/pt-br.js');

let semana = moment().format("w")

bot.create().then((client) => start(client));
function start(client) {
  client.onMessage((message) => {
    let resp = stages.step[getStage(message.from)].obj.execute(
      message.from,
      message.body,
      message.sender.name
    );  
    
    const nome = message.sender.pushname
    let stage = (getStage(message.from))
    
    for (let index = 0; index < resp.length; index++) {
      const element = resp[index];
      client.sendText(message.from, element);        
    }

    
    if (stage == 3) {
        enviar_senha(client, message, nome, semana)
      }
    }
  );
}

function getStage(user) {
  if (banco.db[user]) {
    //Sexistir esse numero no banco de dados
    return banco.db[user].stage;
  } else {
    //Se for a primeira vez que entra e contato
    banco.db[user] = {
      stage: 0,
      itens: [],
      imagens: [],
      numero: 0,
      nome: ''
    };
    return banco.db[user].stage;
  }
}

/*
function getName(user, name){
  banco[user].nome = name
}
*/
  


