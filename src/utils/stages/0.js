const cardapio = require("../products");
const banco = require("../bd");

function execute(user, msg, contato, owner) {

  let menu = " CARDAPIO \n\n";
  
  Object.keys(owner.products).forEach((i) => {
    let element = owner.products[i];
    let pos = i + 1
    menu += `${pos} - ${element.name}        R$ ${element.price} \n`;
  });
  
  banco.db[user].stage = 1;
  banco.db[user].nome = contato
  banco.db[user].numero = user.split('@')[0]
  
  // STAGE1 FROM BD
  return [
    `Olá ${contato} do numero ${user.split('@')[0]} sou uma assistente virtual, 
    irei apresentar o carpádio, para fazer o pedido basta enviar o codigo do produto`,
    menu,
  ];
}

exports.execute = execute;
