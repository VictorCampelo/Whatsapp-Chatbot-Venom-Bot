let moment = require('moment')
require('moment/locale/pt-br.js');

let dia_atual = moment().format('dddd')
let data_sabado = moment().format()
let data_domingo = moment().format()

if (dia_atual == 'domingo') {
    data_sabado = moment().add(6, 'days').format('L');    
    data_domingo = moment().add(7, 'days').format('L');      
}
else if (dia_atual == 'segunda-feira') {
    data_sabado = moment().add(5, 'days').format('L');    
    data_domingo = moment().add(6, 'days').format('L');      
}
else if (dia_atual == 'terça-feira') {
    data_sabado = moment().add(4, 'days').format('L');    
    data_domingo = moment().add(5, 'days').format('L');      
}
else if (dia_atual == 'quarta-feira') {
    data_sabado = moment().add(3, 'days').format('L');    
    data_domingo = moment().add(4, 'days').format('L');      
}
else if (dia_atual == 'quinta-feira') {
    data_sabado = moment().add(2, 'days').format('L');    
    data_domingo = moment().add(3, 'days').format('L');      
}
else if (dia_atual == 'sexta-feira') {
    data_sabado = moment().add(1, 'days').format('L');    
    data_domingo = moment().add(2, 'days').format('L');      
}
else if (dia_atual == 'sábado') {
    data_sabado = moment().add(1, 'days').format('L');    
    data_domingo = moment().add(2, 'days').format('L');      
}

module.exports = {data_sabado, data_domingo}
