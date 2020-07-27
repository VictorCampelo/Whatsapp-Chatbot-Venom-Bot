const express = require('express');
const bot = require("./bot")
const fs = require("fs")

const app = express();

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  
  let student = {}
  fs.readFile('output.json', (err, data) => {
    if (err) throw err;
    student = JSON.parse(data);
    console.log(student);
    res.send(student);
  });

});

app.listen(3000);