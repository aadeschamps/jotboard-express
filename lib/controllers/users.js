/**
* User Controller
*/
'use strict';
const db = require('../helpers/connection');
const userModel = require('../models/users');

let usersController = {

  getUser: function(req, res, next) {
    return res.json('got you\'re user');
  },

  createUser: function(req, res, next) {
    const createOpts = req.body;
    
    const validationError = userModel.validate(createOpts);
    if (validationError) {
      return res.status(400).send({ error: validationError });
    }

    return userModel.create(db, createOpts)
      .then((user) => {
        return res.status(201).send();
      })
      .catch((err) => {
        res.status(500).send({ message: 'Error creating a user'});
      });
  }
  
};

module.exports = usersController;
