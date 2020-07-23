const data = require('./data_missa')
const numero = require('./solicitacoes_semana')

let comunidades = {
    1: {
        comunidade: "Jesus Libertador",
        horario: "08h",
        vagas: 80,
        data: data.data_domingo,
        nome: '',
        numero_solicitante: '',
        data_solicitacao: '',
        id_solicitacao: '',
        semana_solicitacao: ''
    },

    2: {
        comunidade: "Jesus Libertador",
        horario: "19h",
        vagas: 80,
        data: data.data_domingo,
        solicitante: '',
        data_solicitacao: '',
        id_solicitacao: '',
        semana_solicitacao: ''
    },

    3: {
        comunidade: "Santo Expedito",
        horario: "19h",
        vagas: 40,
        data: data.data_sabado,
        solicitante: '',
        data_solicitacao: '',
        id_solicitacao: '',
        semana_solicitacao: ''
    },

    4: {
        comunidade: "Santo Antonio",
        horario: "10h",
        vagas: 50,
        data: data.data_domingo,
        solicitante: '',
        data_solicitacao: '',
        id_solicitacao: '',
        semana_solicitacao: ''
    },

    5: {
        comunidade: "Nossa Senhora das Dores",
        horario: "18h",
        vagas: 40,
        data: data.data_sabado,
        solicitante: '',
        data_solicitacao: '',
        id_solicitacao: '',
        semana_solicitacao: ''
    },  
}

numero.solicitacoes_semana(comunidades)

exports.opcoes = comunidades;