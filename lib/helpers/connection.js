'use strict';

const pgp = require('pg-promise')();
const config = require('config');

const db = pgp(config.database);

module.exports = db;
