let pgp = require('pg-promise')();
let config = require('config');

const db = pgp(config.database);

module.exports = db;