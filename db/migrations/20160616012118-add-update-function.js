'use strict';

var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  let sql = `
    CREATE OR REPLACE FUNCTION update_updates_at_column() 
    RETURNS TRIGGER AS $$
    BEGIN
        NEW.updated_at = now();
        RETURN NEW; 
    END;
    $$ language 'plpgsql';

    CREATE TRIGGER update_updates_at_column BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE  update_updates_at_column();
    CREATE TRIGGER update_updates_at_column BEFORE UPDATE ON collaborators FOR EACH ROW EXECUTE PROCEDURE  update_updates_at_column();
    CREATE TRIGGER update_updates_at_column BEFORE UPDATE ON boards FOR EACH ROW EXECUTE PROCEDURE  update_updates_at_column();
  `
  db.runSql(sql, callback);
};

exports.down = function(db, callback) {
  callback();
};
