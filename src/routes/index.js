var express = require('express');
const routesIndex = express.Router();

// THIS IS TEST ROUTER, ITS RETURN A JSON CREATED IN VENOM BOT AND STORED IN "UTILS/FILES"

routesIndex.get('/', (req, res) => {
  fs.readFile('../utils/files/output.json', (err, data) => {
    if (err) throw err;
    let student = JSON.parse(data);
    console.log(student);
    res.json(student);
  });
});

module.exports = routesIndex;