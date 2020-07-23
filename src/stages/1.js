const banco = require("../banco");
const comunidade = require('../comunidades')
const nome = require("../index")
let moment = require('moment')
require('moment/locale/pt-br.js');

let count = 1
function execute(user, msg) {
  if (msg === "*") {
    banco.db[user].stage = 0;
    banco.db[user].itens = [];
    banco.db[user].imagens = [];
    banco.db[user].numero = 0
    count = 1;
    return ["Solicitação cancelada com sucesso"];
  }

  if (msg === "#") {
    banco.db[user].stage = 2;
    return ["Estamos finalizando sua solicitação, ok?"];
  }

  if (!comunidade.opcoes[msg]) {
    return [
      `Código inválido, uma opção válida`,
      "```Digite # para finalizar ou * para cancelar```",
    ];
  }

  if (comunidade.opcoes[msg].vagas == 0) {
    return [
      `O número de vagas para a comunidade ${comunidade.opcoes[msg].comunidade} (horário: ${comunidade.opcoes[msg].horario}) está esgotado.`,
      "```Digite # para finalizar ou * para cancelar```",
    ];
  }

  

  let id = `${comunidade.opcoes[msg].comunidade}_${comunidade.opcoes[msg].vagas}`;
  let semanaDoAno = moment().format("w");
  let data_atual = moment().format('L')
  let numero = user.split('@')[0]
  let usuario = nome
  
  
  let tamanho_array = banco.db[user].itens.length
  
  if (tamanho_array == 0) {
     count = 1
  }
   
   let solicitacoes_semana = parseInt(banco.db[user].numero)
   solicitacoes_semana += count
   count += 1 
  
    

  if (solicitacoes_semana > 4) {
    return ['O número máximo de solicitações permitidas por semana é 4',
    "```Digite # para finalizar ou * para cancelar```"]
  } else {
    comunidade.opcoes[msg].nome = usuario,
    comunidade.opcoes[msg].numero_solicitante = numero,
    comunidade.opcoes[msg].data_solicitacao = data_atual,
    comunidade.opcoes[msg].id_solicitacao = id,
    comunidade.opcoes[msg].semana_solicitacao = semanaDoAno  
    banco.db[user].itens.push(comunidade.opcoes[msg]);
    banco.db[user].imagens.push([id, semanaDoAno])
    
  }  
     
    return [
      `Comunidade (${comunidade.opcoes[msg].comunidade}) selecionada com sucesso`,
      "```Digite # para finalizar ou * para cancelar```",
    ];
  }
 


exports.execute = execute;
