const banco = require("../banco");

function execute(user, msg) {
  banco.db[user].stage = 0;
  banco.db[user] = {
    itens: [],
    imagens: [],
  };
 ;
}

exports.execute = execute;
