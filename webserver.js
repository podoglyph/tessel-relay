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
  var indexRegex = /(\d)$/;
  var result = indexRegex.exec(urlParts.pathname);
  var index = result[1];

  if (urlParts.pathname.match(ledRegex) && index != 6 && index != 5)  {
    toggleLED(index, request, response);
  } else if (index == 6) {
      downLeds(request, response);
  } else if (index == 5) {
      upLeds(request, response);
  } else {
      console.log("Something is amiss.")
  }

});

server.listen(8080);
server.on('listening', function() {
  downLeds();
})

console.log("All LEDS set to off!");
console.log('Server running at http://192.168.1.101:8080/ for Access Point or http://192.168.0.42:8080 for WIFI');

function toggleLED (index, request, response) {

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

function downLeds(request, response) {
  var leds = tessel.led;

  for (i = 0; i < leds.length; i++) {
    leds[i].off();
  }

  if (response) {
    response.writeHead(200, {"Content-Type": "application/json"});
    response.end(JSON.stringify({bar: "foo"}));
  }
}

function upLeds(request, response) {
  var leds = tessel.led;

  for (i = 0; i < leds.length; i++) {
    leds[i].on();
  }

  response.writeHead(200, {"Content-Type": "application/json"});
  response.end(JSON.stringify({foo: "none"}));
}
