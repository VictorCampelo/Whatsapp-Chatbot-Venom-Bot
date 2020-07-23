const Pool = require('pg').Pool
const db = new Pool({
  user: 'root',
  password: 'root',
  host: 'localhost',
  port: 5432,
  database: 'teste'
})


module.exports = db