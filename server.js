var http = require('http');
var myModule = require('./src/handler.js');

var server = http.createServer(myModule);

server.listen(3000, function() {
  console.log('Listening to port 3000');
});
