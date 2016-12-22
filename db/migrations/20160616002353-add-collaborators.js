'use strict';

var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  let sql = `
    CREATE TABLE collaborators (
      id SERIAL PRIMARY KEY,
      user_id int references users(id),
      board_id int references boards(id),
      accepted boolean DEFAULT false,
      active boolean DEFAULT true,
      created_at timestamp DEFAULT current_timestamp,
      updated_at timestamp DEFAULT current_timestamp
    );
  `
  db.runSql(sql, callback);
};

exports.down = function(db, callback) {
  db.dropTable('collaborators', callback);
};
