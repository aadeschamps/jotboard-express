/**
* Session Controller
*/
'use strict';

const sessionsController = {
  createSession: function(req, res, next) {
    return res.json('created you\'re user session');
  },

  deleteSession: function(req, res, next) {
    return res.json('deleted you\'re user session');
  }
};

module.exports = sessionsController;
