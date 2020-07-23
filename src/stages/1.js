const cardapio = require("../cardapio");
const banco = require("../banco");

function execute(user, msg) {
  if (msg === "*") {
    banco.db[user].stage = 0;
    return ["Pedido cancelado com sucesso"];
  }

  if (msg === "#") {
    banco.db[user].stage = 2;
    return ["Estamos fechando seu pedido, ok?"];
  }

  if (!cardapio.menu[msg]) {
    return [
      "Código inválido, digite corretamente",
      "```Digite # para finalizar ou * para cancelar```",
    ];
  }
  //IF USER DIGITE A CORRECT NUMBER, THEM  EXECUTE THE OPERATIONS ABOVE!!!

  //add a new item to list of itens
  banco.db[user].itens.push(cardapio.menu[msg]);

  console.log(banco.db[user].itens)

  return [
    `Item(${cardapio.menu[msg].descricao}) adiconado com sucesso`,
    "Digite # para finalizar \n"+
    "* para cancelar \n" +
    "@ para adicionar outro produto(ainda nao funciona!!!)",
  ];
}

exports.execute = execute;
