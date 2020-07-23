const banco = require('./banco')
const db = require('./database/banco_dados')


let enviar_senha = function (client, message, nome, semana) {
let img = 'img/'
const ids = banco.db[message.from].imagens

for (let i = 0; i < ids.length; i++ ){
  if (ids[i][1] == semana) {
    const imagem = img + ids[i][0] + '.png'
    client.sendImage(message.from, imagem)                
    mensagem = `${nome}, para mais informações entre em contato com secretária paroquial através do número xxxx-xxxx`
    client.sendText(message.from, mensagem )
  }       
}; 

const solicitacoes = banco.db[message.from].itens
for (let i = 0; i < solicitacoes.length; i++) {
  let solicitacao = solicitacoes[i]
  const comunidade = solicitacao.comunidade
  const numero = solicitacao.numero_solicitante
  const usuario = nome
  const data = solicitacao.data
  const semana = solicitacao.semana_solicitacao
  const id_solicitacao = solicitacao.id_solicitacao
  const horario = solicitacao.horario
  const data_solicitacao = solicitacao.data_solicitacao
  const VALUES = [comunidade, horario, data, data_solicitacao, semana, id_solicitacao, usuario, numero]

  console.log(VALUES)

  let query = `INSERT INTO solicitacoes ("comunidade",	"horario",	"dia_missa",	"data_solicitacao",	
  "semana",	"id_solicitacao",	"nome",	"numero") 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`
 
  db.query(query, VALUES, function(err){
    if (err) console.log(err)
  })
 }
}

module.exports = enviar_senha