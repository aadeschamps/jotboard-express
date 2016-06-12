let express = require('express');
let lodash = require('lodash');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let auth = require('./middleware/auth');
let routes = require('./routes.json');
let UsersController = require('./controllers/users');
let SessionsController = require('./controllers/sessions');

let createServer = function(config) {
  let server = express();

  // mount middleware
  server.use(bodyParser.json());
  server.use(morgan(config.logStyle));

  // initialize controllers
  let controllers = {
    users: new UsersController(),
    sessions: new SessionsController()
  };

  // mount all routes
  lodash.forOwn(routes, function routeIterator(value, route){
    let controller = controllers[value.controller];
    let routesToMount = lodash.omit(value, ['controller', 'auth']);
    lodash.forOwn(routesToMount, function methodIterator(routeDetails, method) {
      var handlers = [];
      if (value.auth || routeDetails.auth) {
        handlers.push(auth);
      }
      handlers.push(controller[routeDetails.operation])
      server[method](route, handlers);
    }); 
  });

  // mount socket server

  // return the express application
  return server;
};

module.exports = createServer;