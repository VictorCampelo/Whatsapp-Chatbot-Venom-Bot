const banco = require("../banco");

function execute(user, msg) {

  //SAVE INFO IN DATABASE HERE

  banco.db[user].stage = 0;
  return [
    "Obrigado pela preferencia.",
    "Aguarde, seu pedido chegará em breve",
    "Mais informações ligue para 33333-3311",
    `Valor do Pedido: ${banco.db[user].preco}`,
    `Valor Troco: ${banco.db[user].valor_troco}`,
    `Lista: ${banco.db[user].itens.descricao}`
  ];
}

exports.execute = execute;