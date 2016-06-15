var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  let sql = `
    CREATE TABLE boards (
      id SERIAL PRIMARY KEY,
      title text,
      user_id int references users(id),
      code text
    )
  `
  db.runSql(sql, callback);
};

exports.down = function(db, callback) {
  db.dropTable('boards', callback);
};