/**
* User Controller
*/

let UsersController = class UsersController {

  constructor(opts) {
  }

  getUser(req, res, next) {
    return res.json('got you\'re user');
  }

  createUser(req, res, next) {
    return res.json('created a user for you');
  }

};

module.exports = UsersController;