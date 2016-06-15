var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  let sql = `
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      email text,
      password text
    )
  `
  db.runSql(sql, callback);
};

exports.down = function(db, callback) {
  db.dropTable('users', callback);
};
