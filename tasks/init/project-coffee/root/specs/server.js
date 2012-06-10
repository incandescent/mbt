var connect = require('connect'),
    http = require('http'),
    path = require('path');

var app = connect()
  .use(connect.static(__dirname))
  .use(connect.static(path.resolve(__dirname + '/../../')));

console.log('starting test server: http://localhost:8888');
http.createServer(app).listen(8888);
