/**
* Session Controller
*/
'use strict';
const Promise = require('bluebird');
const db = require('../helpers/connection');
const userModel = require('../models/users');
const sessionValidator = require('../validators/sessions');
const encrypt = require('../helpers/encrypt');
const _ = require('lodash');
const omittedUserInfo = ['created_at', 'updated_at', 'password'];

const sessionsController = {
  createSession: function(req, res, next) {
    const sessionOpts = req.body;
    const validationErrors = sessionValidator(sessionOpts);

    if (validationErrors) {
      return res.status(400).send(validationErrors);
    }

    userModel.getByEmail(db, sessionOpts)
      .then((user) => Promise.props({user, compare: encrypt.compare(sessionOpts.password, user.password)}))
      .then((results) => Promise.props({ user: results.user, token: encrypt.createToken({ id: results.user.id }) }))
      .then((results) => {
        const options = {
          httpOnly: true
        }
        res.cookie('x-authorization', results.token, options);
        res.status(200).send(_.omit(results.user, omittedUserInfo));
      })
      .catch((err) => {
        const message = err.err || 'an unexpected problem occured';
        const status = err.status || 500;

        res.status(status).send({ message });
      });
  },

  deleteSession: function(req, res, next) {
    res.clearCookie('x-authorization');
    return res.status(200).send();
  },

  getSession: function(req, res, next) {
    const user = req.user;

    userModel.getById(db, user)
      .then((user) => res.status(200).send(_.omit(user, omittedUserInfo)))
      .catch((err) => {
        const message = err.err || 'an unexpected problem occured';
        const status = err.status || 500;
        
        res.status(status).send({ message });
      });
  }
};

module.exports = sessionsController;
