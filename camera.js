'use strict';
const tessel = require('tessel');
const av = require('tessel-av');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const os = require('os');
const path = require('path');
const port = 8888;
const cors =require('cors');
const camera = new av.Camera();

server.listen(port, function () {
  downLeds();
  console.log(`http://${os.hostname()}.local:${port}`);
  console.log("All LEDS set to off!");
});

app.use(express.static(path.join(__dirname, '/public')));
app.use(cors({origin: '*'}));

app.get('/', function (request, response) {
  response.send('hello world')
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
