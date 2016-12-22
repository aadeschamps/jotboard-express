'use strict';
const userValidator = require('../validators/users');
const encrypt = require('../helpers/encrypt');

const user = {
  getOne: function(db, opts) {
    const query = `SELECT * FROM users WHERE`;
    const queryOpts = {};

    return db.query(query, queryOpts);
  },

  create: function(db, opts) {
    return encrypt.hash(opts.password)
      .then((hash) => {
        const query = `
          INSERT INTO users (
            email,
            password
          ) VALUES (
            $<email>,
            $<password>
          ) RETURNING id
        `;
        const queryOpts = {
          email: opts.email,
          password: hash
        };

        return db.query(query, queryOpts);    
      })
      
  },
  
  validate: function(opts) {
    return userValidator(opts)
  }
}

module.exports = user;