'use strict';
const userValidator = require('../validators/users');
const encrypt = require('../helpers/encrypt');
const Promise = require('bluebird');

const user = {
  getByEmail: function(db, opts) {
    const query = `
      SELECT * 
      FROM users 
      WHERE email=$<email>`;
    const queryOpts = {
      email: opts.email
    };

    return db.query(query, queryOpts)
      .then((users) => {
        if (users.length < 1) {
          return Promise.reject({ status: 404, err: 'User not found' })
        }
        return users[0]
      });
  },

  getById: function(db, opts) {
    const query = `
      SELECT * 
      FROM users 
      WHERE id=$<id>`;
    const queryOpts = {
      id: opts.id
    };

    return db.query(query, queryOpts)
      .then((users) => {
        if (users.length < 1) {
          return Promise.reject({ status: 404, err: 'User not found' })
        }
        return users[0]
      });
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