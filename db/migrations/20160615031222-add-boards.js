'use strict';

var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  let sql = `
    CREATE TABLE boards (
      id SERIAL PRIMARY KEY,
      title text,
      owner int references users(id),
      code text,
      created_at timestamp DEFAULT current_timestamp,
      updated_at timestamp DEFAULT current_timestamp
    );
  `
  db.runSql(sql, callback);
};

exports.down = function(db, callback) {
  db.dropTable('boards', callback);
};