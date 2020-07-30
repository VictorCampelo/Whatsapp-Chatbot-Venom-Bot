var express = require('express');
const fs = require("fs")
const routesIndex = express.Router();

// THIS IS TEST ROUTER, ITS RETURN A JSON CREATED IN VENOM BOT AND STORED IN "UTILS/FILES"

routesIndex.get('/', (req, res) => {
  fs.readFile('./src/utils/files/output.json', (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

routesIndex.get('/qrcode', (req, res) => {
  var img = fs.readFileSync('./src/utils/files/marketing-qr.png');
  res.writeHead(200, {'Content-Type': 'image/png' });
  res.end(img, 'binary');
});

module.exports = routesIndex;