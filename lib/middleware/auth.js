'use strict';

let auth = function(req, res, next) {
  // TODO (alex): implement authentication
  console.log('authenticated user id:', req.params.userId);
  next();
};

module.exports = auth;