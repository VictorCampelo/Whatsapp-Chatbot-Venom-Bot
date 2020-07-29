const banco = require("../bd");
// const db = require("../database/mysqlConnect");
// const db  = require("../../database/index.js")
// const bd = require("../database/pgconnect");
const Client  = require("../../models/Client")
const Sequelize = require('sequelize');

function execute(user, msg) {
  
  //SAVE INFO IN DATABASE HERE
  
  var numero = banco.db[user].numero
  var nome = banco.db[user].nome
  var preco = banco.db[user].preco
  var endereco = banco.db[user].endereco
  var valor_troco = banco.db[user].valor_troco
  // const VALUES = [numero, nome, preco, endereco, valor_troco]

  if(typeof nome === 'undefined'){
    nome = "no name"
  }
  
  console.log(banco.db[user])

  Client.create({
    name: nome,
    numero: numero,
    endereco: endereco,
    preco: preco,
    valor_troco: valor_troco
  }).then(newUser => {
    console.log(`New user ${newUser.name}, with id ${newUser.id} has been created.`);
  });
  
  
  // let sql = "INSERT INTO pedidos (numero,nome,preco,endereco,valor_troco) VALUES (?,?,?,?,?)"
  
  // db.query(sql, VALUES, function (err, result) {
  //   if (err) throw err;
  //   console.log("Number of records inserted: " + result.affectedRows);
  // })
  
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
    `Valor Troco: ${banco.db[user].valor_troco}`
  ];
}

exports.execute = execute;