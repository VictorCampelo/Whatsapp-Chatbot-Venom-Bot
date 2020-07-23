// Supports ES6
// import { create, Whatsapp } from 'sulla';
const bot = require("venom-bot");
const banco = require("./banco");
const stages = require("./stages");

bot.create().then((client) => start(client));
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
  console.log(client.getHostDevice())
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
