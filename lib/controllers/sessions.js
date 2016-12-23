/**
* Session Controller
*/
'use strict';
const Promise = require('bluebird');
const db = require('../helpers/connection');
const user = require('../models/users');
const sessionValidator = require('../validators/sessions');
const encrypt = require('../helpers/encrypt');

const sessionsController = {
  createSession: function(req, res, next) {
    const sessionOpts = req.body;
    const validationErrors = sessionValidator(sessionOpts);

    if (validationErrors) {
      return res.status(400).send(validationErrors);
    }

    user.getOne(db, sessionOpts)
      .then((user) => Promise.props({user, compare: encrypt.compare(sessionOpts.password, user.password)}))
      .then((results) => encrypt.createToken({ id: results.user.id }))
      .then((token) => {
        const options = {
          httpOnly: true
        }
        res.cookie('x-authorization', token, options);
        res.status(200).send()
      })
      .catch((err) => {
        console.log(err);
        const message = err.err || 'an unexpected problem occured';
        const status = err.status || 500;
        
        res.status(status).send({ message });
      });
  },

  deleteSession: function(req, res, next) {
    res.clearCookie('x-authorization');
    return res.status(200).send();
  }
};

module.exports = sessionsController;
