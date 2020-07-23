const cardapio = require("../cardapio");
const banco = require("../banco");

function execute(user, msg, contato) {
  let menu = " CARDAPIO \n\n";

  Object.keys(cardapio.menu).forEach((i) => {
    let element = cardapio.menu[i];
    menu += `${i} - ${element.descricao}        R$ ${element.preco} \n`;
  });

  banco.db[user].stage = 1;
  banco.db[user].nome = contato
  banco.db[user].numero = user.split('@')[0]

  return [
    `Olá ${contato} do numero ${user.split('@')[0]} sou uma assistente virtual, 
    irei apresentar o carpádio, para fazer o pedido basta enviar o codigo do produto`,
    menu,
  ];
}

exports.execute = execute;
