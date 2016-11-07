module.exports = handler;

var fs = require('fs');
var querystring = require('querystring');

function handler (request, response) {
  var url = request.url;
  var endpoint = url.split('.')[1];
  var allTheData = '';
  if (url == '/create/post') {
    response.writeHead(302, {"Location": "/index.html"});
    request.on('data', function (chunkOfData) {
      allTheData += chunkOfData;
    });

    request.on('end', function () {
      var convertedData = querystring.parse(allTheData);
      console.log(convertedData);
      response.end();
    });
  } else {
  response.writeHead(200, { "content-type": "text/" + (endpoint ? endpoint : "html")} );
    fs.readFile(__dirname + '/../public' + (url == '/' ? '/index.html' : url), function(error, file) {
      if (error) {
        console.log (error);
        return;
      }
      response.end(file);
    });
  }
}
