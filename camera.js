'use strict';
const express = require('express');
const app = express();
const server = require('http').Server(app);
const os = require('os');
const path = require('path');
const port = 8888;
const tessel = require('tessel');
const av = require('tessel-av');
const camera = new av.Camera();

var allowCrossDomain = function(request, response, next) {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    next();
}

server.listen(port, function () {
  console.log(`http://${os.hostname()}.local:${port}`);
});

app.use(express.static(path.join(__dirname, '/public')));
app.use(allowCrossDomain);

app.get('/', function (req, res) {
  res.send('hello world')
})

app.get('/stream', (request, response) => {
  response.redirect(camera.url);
});

app.get('/leds/:ledId', (request, response) => {
  const indexRegex = /(\d)$/;
  const path = request.path;
  const result = indexRegex.exec(path);
  const index = result[1];

  if (index <= 3) {
    toggleLED(index, request, response);
  } else if (index == 5) {
      upLeds(request, response);
  } else if (index ==6) {
      downLeds(request, response);
  } else {
      console.log("Something is amiss.")
  }
})

// var server = http.createServer(function (request, response) {
//
//   response.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
//
//   var urlParts = url.parse(request.url, true);
//   var ledRegex = /leds/;
//   var indexRegex = /(\d)$/;
//   var result = indexRegex.exec(urlParts.pathname);
//   var index = result[1];
//
//   if (urlParts.pathname.match(ledRegex) && index != 6 && index != 5)  {
//     toggleLED(index, request, response);
//   } else if (index == 6) {
//       downLeds(request, response);
//   } else if (index == 5) {
//       upLeds(request, response);
//   } else {
//       console.log("Something is amiss.")
//   }
// });
//
// server.listen(8080);
// server.on('listening', function() {
//   downLeds();
// })

console.log("All LEDS set to off!");
console.log('Server running at http://192.168.1.101:8080/ for Access Point or http://192.168.0.42:8080 for WIFI');

function toggleLED (index, request, response) {
  console.log(index);

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
  const leds = tessel.led;

  for (let i = 0; i < leds.length; i++) {
    leds[i].off();
  }

  if (response) {
    response.writeHead(200, {"Content-Type": "application/json"});
    response.end(JSON.stringify({bar: "foo"}));
  }
}

function upLeds(request, response) {
  const leds = tessel.led;

  for (let i = 0; i < leds.length; i++) {
    leds[i].on();
  }

  response.writeHead(200, {"Content-Type": "application/json"});
  response.end(JSON.stringify({foo: "none"}));
}
