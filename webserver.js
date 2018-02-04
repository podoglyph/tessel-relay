var tessel = require('tessel');
var http = require('http');
var fs = require('fs');
var url = require('url');

var server = http.createServer(function (request, response) {

  response.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
	response.setHeader('Access-Control-Request-Method', '*');
	response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	response.setHeader('Access-Control-Allow-Headers', '*');

  if ( request.method === 'OPTIONS' ) {
		response.writeHead(200);
		response.end();
		return;
	}

  var urlParts = url.parse(request.url, true);

  var ledRegex = /leds/;

  if (urlParts.pathname.match(ledRegex)) {
    toggleLED(urlParts.pathname, request, response);
  } else {
    console.log("Something is amiss.")
  }
});

server.listen(8080);

console.log('Server running at http://192.168.1.101:8080/ for Access Point or http://192.168.0.42:8080 for WIFI');

function toggleLED (url, request, response) {
  var indexRegex = /(\d)$/;

  var result = indexRegex.exec(url);

  var index = result[1];

  var led = tessel.led[index];

  led.toggle(function (err) {
    if (err) {
      console.log(err);
      response.writeHead(500, {"Content-Type": "application/json"});
      response.end(JSON.stringify({error: err}));
    } else {
      response.writeHead(200, {"Content-Type": "application/json"});
      response.end(JSON.stringify({on: led.isOn}));
    }
  });
}
