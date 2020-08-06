const banco = require("../bd");
// const db = require("../database/mysqlConnect");
// const db  = require("../../database/index.js")
// const bd = require("../database/pgconnect");
const Client  = require("../../models/Client")
const Sequelize = require('sequelize');
const Order = require("../../models/Order");

function execute(user, msg, contact, owner) {
  
  //SAVE INFO IN DATABASE HERE
  
  saveClient(banco.db[user])
  
  const message = [
    "Obrigado pela preferencia.",
    "Aguarde, seu pedido chegará em breve",
    "Mais informações ligue para 33333-3311",
    `Valor do Pedido: ${banco.db[user].preco}`,
    `Valor Troco: ${banco.db[user].valor_troco}`
  ];
  
  banco.db[user] = {
    stage: 0,
    itens: [],
    numero: 0,
    preco: 0.0,
    endereco: "",
    valor_troco: 0.0,
    nome: ''
  };
  
  return message
}

async function saveClient(user) {
  var number = parseInt(user.numero)
  var name = user.nome
  var payment = user.preco
  var address = user.endereco
  // const VALUES = [numero, nome, preco, endereco, valor_troco]
  
  if(typeof nome === 'undefined'){
    nome = "no name"
  }
  
//TO-DO
//check if a client is already registed
//crypt number
//use number as foreingkey
  var client = await Client.findOne({where: { number}})
  console.log(client)
  if (client) {
    payment = client.payment + payment
    await client.update({name, payment, address})
  } else {
    client = await Client.create({number, name, payment, address})
  }

  if (client) {
    Object.keys(user.itens).forEach(async (i) =>{
      await Order.create({
        Client_id: client.id,
        Product_id: user.itens[i].id
      })
    });    
  }
}

exports.execute = execute;