var db = require('../helpers/connection');

class User {
  initialize(val) {
    this.val = val;
  }
  static getOne(opts) {

  }
  static getAll(opts) {

  }
  static create(opts) {
    return db.query(`
      INSERT INTO users (
        email,
        password
      ) VALUES (
        $/email/,
        $/password/
      ) RETURNING id`,
      {
        email: opts.email,
        password: opts.passwordDigest
      });
  }
};

module.exports = User;