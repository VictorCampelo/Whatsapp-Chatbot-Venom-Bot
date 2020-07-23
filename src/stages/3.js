const banco = require("../banco");
const stages = require("../stages");

function execute(user, msg) {
  if (msg === "*") {
    banco.db[user].stage = 0;
    banco.db[user].itens = []
    banco.db[user].imagens = []
    banco.db[user].numero = 0
    return ["Solicitação cancelada com sucesso"];
  }

  if (msg === "#") {
    
    return[`Obrigado pela sua solicitação ${user}`]           
  };

  banco.db[user].stage = 0;
  banco.db[user].itens = []
  banco.db[user].imagens = []
      
  }





exports.execute = execute;
