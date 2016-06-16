var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  let sql = `
    CREATE TABLE invites (
      id SERIAL PRIMARY KEY,
      user_id int references users(id),
      board_id int references boards(id)
    )
  `
  db.runSql(sql, callback);
};

exports.down = function(db, callback) {
  db.dropTable('invites', callback);
};
