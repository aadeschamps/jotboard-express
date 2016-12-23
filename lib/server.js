'use strict';

const express = require('express');
const _ = require('lodash');
const config = require('config');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const auth = require('./middleware/auth');
const token = require('./middleware/token');
const routes = require('./routes.json');
const usersController = require('./controllers/users');
const sessionsController = require('./controllers/sessions');
const path = require('path');

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
  server.use(cookieParser());
  server.use(morgan(config.logStyle));
  server.use(token);

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