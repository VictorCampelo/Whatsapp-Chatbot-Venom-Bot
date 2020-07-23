const db = require('./database/banco_dados')
const banco = require('./banco')
let moment = require('moment')
require('moment/locale/pt-br.js');

let semana = parseInt(moment().format("w"));

const solicitacoes_semana = function (comunidades) {
Object.keys(comunidades).forEach((value) => {

let comunidade = String(comunidades[value].comunidade)
let horario = String(comunidades[value].horario)

function teste(){
    return new Promise((resolve, reject) =>{
        try{    
            const resultado = db.query(`select count(*) from solicitacoes WHERE "semana" = ${semana} and "comunidade" = '${comunidade}' and horario = '${horario}'`).then(result => result.rows[0].count)
            resolve(resultado)
            
        } catch(err){
            reject(err)
        }
    })
} 
       
(async function () {

    try{
        const reservado = await teste()
        let vagas = comunidades[value].vagas
        
        if (vagas == 0){
          comunidades[value].vagas = 'indisponível'
        }
        else if (vagas - reservado <= 0){
            comunidades[value].vagas = 'indisponível'
        }
        else{
            comunidades[value].vagas -= reservado
            
        }
    }
    catch(err) {
        console.log(err)
    }  
    
})()

})

}

const solicitacoes_usuario = function(user){

function teste(){
    const numero = user.split('@')[0]
    return new Promise((resolve, reject) =>{
        try{                
            const resultado = db.query(`select count(*) from solicitacoes WHERE numero = ${numero} and semana = ${semana}`).then(result => result.rows[0].count)
            resolve(resultado)
        } catch(err){
            reject(err)
        }
    })
  } 
       
  (async function () {
    const reservado = await teste()
    banco.db[user].numero = reservado          
    })()
  
}


module.exports = {solicitacoes_semana, solicitacoes_usuario}