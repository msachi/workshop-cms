var http = require('http');
var fs = require('fs');
var querystring = require('querystring')
var server = http.createServer(handler);
var message = 'I am so happy to be part of the Node Girls workshop!';
var allTheData = '';

function handler (request, response) {
  var endpoint = request.url;
  console.log(endpoint);
  var method = request.method;
  console.log(method);
  if (endpoint == '/create-post') {
    response.writeHead(302, {"Location": "/index.html"});
    request.on('data', function (chunkOfData) {
      allTheData += chunkOfData;
    });

    request.on('end', function () {
      var convertedData = querystring.parse(allTheData);
      console.log(convertedData);
      response.end();
    });
  } else if (endpoint == '/') {
    response.writeHead(200, { "content-type": "text/html"} );
    fs.readFile(__dirname + '/public/index.html', function(error, file) {
      if (error) {
        console.log (error);
        return;
      }
      response.end(file);
    });
  } else {
    response.writeHead(200, { "content-type": "text/" + endpoint.split('.')[1]} );
    fs.readFile(__dirname + '/public' + endpoint, function(error, file) {
      if (error) {
        console.log (error);
        return;
      }
      response.end(file);
    });
  }
  // if (endpoint == '/node') {
  //   response.writeHead(200, {"Content-Type": "text/html"});
  //   response.write('Node!'); //response body
  //   response.end(); // finish response
  // } else if (endpoint == '/girls') {
  //   response.writeHead(200, {"Content-Type": "text/html"});
  //   response.write('Girls!'); //response body
  //   response.end(); // finish response
  // }
}

server.listen(3000, function() {
  console.log("Server is listening on port 3000.  Ready to accept requests!");
});
