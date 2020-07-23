const banco = require("../banco");
const db = require("../database/mysqlConnect");
// const bd = require("../database/pgconnect");

function execute(user, msg) {
  
  //SAVE INFO IN DATABASE HERE
  
  const numero = banco.db[user].numero
  const nome = banco.db[user].nome
  const preco = banco.db[user].preco
  const endereco = banco.db[user].endereco
  const valor_troco = banco.db[user].valor_troco
  const VALUES = [numero, nome, preco, endereco, valor_troco]
  
  console.log(VALUES)
  
  let sql = "INSERT INTO pedidos (numero,nome,preco,endereco,valor_troco) VALUES (?,?,?,?,?)"
  
  db.query(sql, VALUES, function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  })

  //POSTGRESQL 

  // let query = `INSERT INTO pedidos ("numero",	"nome",	"preco",	"endereco",	
  // "valor_troco") 
  // VALUES ($1, $2, $3, $4, $5)`
  
  // db.query(query, VALUES, function(err){
  //   if (err) console.log(err)
  // })
  
  banco.db[user] = {
    stage: 0,
    itens: [],
    numero: 0,
    preco: 0.0,
    endereco: "",
    valor_troco: 0.0,
    nome: ''
  };

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