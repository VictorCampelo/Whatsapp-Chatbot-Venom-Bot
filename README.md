# Whatsapp Automatization

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Automatização de mensagens para pequenos negocios. 

O projeto prevê a criação de uma sistema de cadastro de pequenos negocios visando a automatização do Whatsapp do propietário e a adiminstração do negócio através de um painel adiminstrativo.

## Fluxo Proprietário:
 - Entra no sistema -> Fazer o Cadastro/Login.
##### Após logado: 
 - Personalizar as mensagens padrões para o chatbot -> Receber um Qrcode 
##### Após ler o QRcode pelo Whatsapp:
 - O whatsapp do proprietário irá, para cada nova mensagem recebida, responder automaticamente com as mensagens cadastradas
 - As informações do cliente, coletadas durante uma conversa, serão salvas no Banco de Dados
##### Após o cliente finalizar um pedido: 
 - O painel adiminstrativo do proprietário exibirá as informações do novo pedido e adicionará a uma fila.

# Nova Features!

  - Create a database connector
  - Export QRcode to Pgn file

### Tecnologias

* [Venom] - Venom is a high-performance system developed with JavaScript to create a bot for WhatsApp
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]

### Installation

Requer [Node.js](https://nodejs.org/) v4+ para executar.
Instalar as dependencias e executar o Bot
```sh
$ cd Whatsapp-Chatbot-Venom-Bot
$ npm install -d
$ cd src
$ node index.js
```

Para ambiente de produção...

```sh
$ npm install --production
$ NODE_ENV=production node index.js
```

### Development

### Docker

### Todos

 - Integrar ao Express
 - Criar as models com sequelize
 - Enviar o QRcode png pela rota
 - Criar multiplas instancias do Venom

License
----

MIT
