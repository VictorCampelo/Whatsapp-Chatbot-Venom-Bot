const pgp = require('pg-promise')(/* initialization options */);

const cn = {
    host: 'localhost', // server name or IP address;
    port: 5432,
    database: 'teste',
    user: 'root',
    password: 'root'
};

// alternative:
// var cn = 'postgres://username:password@host:port/database';

const db = pgp(cn); // database instance;

module.exports = db