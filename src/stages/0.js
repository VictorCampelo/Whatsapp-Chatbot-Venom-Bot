const comunidades = require('../comunidades')
const banco = require('../banco')
const numero = require('../solicitacoes_semana')


function execute(user, msg) {
    let menu = "Vou te apresentar as opções disponíveis para assistir a santa missa:  \n\n"
    
     Object.keys(comunidades.opcoes).forEach((value) => {
        let element = comunidades.opcoes[value];        
        let vagas = element.vagas
        let data = element.data 
        menu += `${value} - ${element.comunidade} \n Data: ${data} \n  Horário: ${element.horario} \n Vagas: ${vagas} \n \n `            
    })

    banco.db[user].stage = 1;
    
    numero.solicitacoes_usuario(user)
    return [`Olá caro paroquiano, sou o assistente virtual da Paróquia Jesus Libertador`, menu , "Para selecionar a missa que você deseja assistir, basta digitar o código da comunidade"]  
}

exports.execute = execute;