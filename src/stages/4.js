const banco = require("../banco");

let estagioInterno = 0;
function execute(user, msg) {
  //banco.db[user].stage = 0;

  if (estagioInterno === 1) {
    banco.db[user].stage = 5;
    console.log(msg)
    banco.db[user].valor_troco += parseFloat(msg) - banco.db[user].preco

    //ERRORS VERIFICATIONS
    estagioInterno = 0
    return stages.step[5].obj.execute(user, "");
  }

  if (msg === "1") {
    estagioInterno++;

    return ["Digite o valor em dinheiro para levarmos o troco: "];
  }
  
  return ["Escolha a forma de pagamento:\n1️⃣-Dinheiro\n2️⃣-Cartão"];
}

exports.execute = execute;
