const banco = require("../banco");


function execute(user, msg) {
  if (msg === "*") {
    banco.db[user].stage = 0;
    banco.db[user].itens = []
    banco.db[user].imagens = []
    banco.db[user].numero = 0
    return ["Solicitação cancelada com sucesso"];
  }

  if (msg === "#") {
    banco.db[user].stage = 3;
    return[`Obrigado pela sua solicitação`]
  }

  let resumo = "  RESUMO DA SOLICITAÇÃO \n\n";
  let total = 0;
  banco.db[user].itens.forEach((value) => {
    
    resumo += `${value.comunidade} horário: ${value.horario} \n`;

    total += 1;
  });

  resumo += "-------------------------\n";
  resumo += ` Solicitações: ${total}`;

  return [resumo, "Para confirmar digite # ou para cancelar digite * "];
}



exports.execute = execute;
