
let SessionsController = class SessionsController {

  contructor(opts) {

  }

  createSession(req, res, next) {
    res.json('totally authenticated dude');
  }

  deleteSession(req, res, next) {
    res.json('totally deleted the sesh, bummer');
  }

}

module.exports = SessionsController;