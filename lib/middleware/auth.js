'use strict';

let auth = function(req, res, next) {
  if (req.user) {
    return next();
  } else {
    return res.status(403).send({ message: 'No valid credentials found' });
  }
};

module.exports = auth;