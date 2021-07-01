const banco = require("../bd");

function execute(user, msg, contact, owner) {
  if (msg === "*") {
    banco.db[user].stage = 0;
    return ["Pedido cancelado com sucesso"];
  }
  
  if (msg === "#") {
    banco.db[user].stage = 3;
    return ["Digite o endereço por favor :"];
  }
  
  let resumo = "  RESUMO DO PEDIDO \n";
  let total = 0;
  
  banco.db[user].itens.forEach
  (
    (i) => {
      console.log(i);
      
      resumo += `${i.describe} ----------------  ${i.price} \n`;
      total += i.price;
      
    }
  );
    
    resumo += "-------------------------\n";
    resumo += ` Total R$ ${total}`;
    
    banco.db[user].preco += total
    
    return [resumo, "Para confirmar digite # \n"+"Para cancelar digite * "];
  }
  
  exports.execute = execute;
  