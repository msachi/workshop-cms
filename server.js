var http = require('http');
var myModule = require('./src/handler.js');

var server = http.createServer(myModule);
// var message = 'I am so happy to be part of the Node Girls workshop!';

server.listen(3000, function() {
  console.log("Server is listening on port 3000.  Ready to accept requests!");
});
