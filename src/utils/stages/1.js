const cardapio = require("../products");
const banco = require("../bd");

function execute(user, msg, contact, owner) {
  if (msg === "*") {
    banco.db[user].stage = 0;
    return ["Pedido cancelado com sucesso"];
  }

  if (msg === "#") {
    banco.db[user].stage = 2;
    return ["Estamos fechando seu pedido, ok?"];
  }

  if (!owner.products[msg-1]) {
    return [
      "Código inválido, digite corretamente",
      "```Digite # para finalizar ou * para cancelar```",
    ];
  }
  //IF USER DIGITE A CORRECT NUMBER, THEM  EXECUTE THE OPERATIONS ABOVE!!!

  //add a new item to list of itens
  banco.db[user].itens.push(owner.products[msg-1]);

  // console.log(banco.db[user].itens)
  console.log("aquiiiii")
  return [
    `Item(${owner.products[msg-1].describe}) adiconado com sucesso`,
    "Digite # para finalizar \n"+
    "* para cancelar \n" +
    "@ para adicionar outro produto(ainda nao funciona!!!)",
  ];
}

exports.execute = execute;
