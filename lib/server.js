'use strict';

let express = require('express');
let _ = require('lodash');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let auth = require('./middleware/auth');
let routes = require('./routes.json');
let usersController = require('./controllers/users');
let sessionsController = require('./controllers/sessions');
let path = require('path');

let createControllers = function(config) {
  return {
    users: usersController,
    sessions: sessionsController
  };
};

let createServer = function(config) {
  let server = express();

  // mount middleware
  server.use(bodyParser.json());
  server.use(morgan(config.logStyle));

  // initialize controllers
  let controllers = createControllers();

  // mount all routes
  _.forOwn(routes, function routeIterator(value, route){
    let controller = controllers[value.controller];
    let routesToMount = _.omit(value, ['controller', 'auth']);
    _.forOwn(routesToMount, function methodIterator(routeDetails, method) {
      var handlers = [];
      if (value.auth || routeDetails.auth) {
        handlers.push(auth);
      }
      handlers.push(controller[routeDetails.operation])
      server[method](route, handlers);
    }); 
  });
  // mount socket server

  // mount static files
  server.use(express.static('dist'))

  // mount front end route
  server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
  });

  // return the express application
  return server;
};

module.exports = createServer;