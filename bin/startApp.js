'use strict';

let createServer = require('../lib/server');
let config = require('config');
let server = createServer(config);
let port = process.env.APP_PORT || config.app.port;

server.listen(port, () => {
  console.log('server listening on port: ' + port);
});
