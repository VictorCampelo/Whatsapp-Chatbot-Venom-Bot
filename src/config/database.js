
var host = process.env.DB_HOSTNAME || 'mariadb';
var user = process.env.DB_USERNAME || 'root';
var pass = process.env.DB_PASSWORD || 'root';
var data = process.env.DB_DB       || 'teste';
var port = process.env.DB_PORT     || '3306';

module.exports = {
  dialect: 'mariadb',
  host: host,
  username: user,
  password: pass,
  database: data,
  port: port,
  define: {
    timestamps: true,
  },
};