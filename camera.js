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
app.use(cors({origin: 'http://localhost:8080'}));

app.get('/', function (req, res) {
  res.send('hello world')
})

app.get('/stream', (req, res) => {
  res.redirect(camera.url);
});

app.get('/leds/:ledId', (req, res) => {

  const index = req.params.ledId;

  if (index <= 3) {
    toggleLED(index, req, res);
  } else if (index == 5) {
      upLeds(req, res);
  } else if (index == 6) {
      downLeds(req, res);
  } else {
      console.log("Something is amiss.")
  }
})

function toggleLED (index, req, res) {
  const led = tessel.led[index];

  led.toggle(function (err) {
    if (err) {
      console.log(err);
      res.writeHead(500, {"Content-Type": "application/json"});
      res.end(JSON.stringify({error: err}));
    } else {
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify({on: led.isOn}));
    }
  });
}

function downLeds(req, res) {
  const leds = tessel.led;

  for (let i = 0; i < leds.length; i++) {
    leds[i].off();
  }

  if (res) {
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify({bar: "foo"}));
  }
}

function upLeds(req, res) {
  const leds = tessel.led;

  for (let i = 0; i < leds.length; i++) {
    leds[i].on();
  }

  res.writeHead(200, {"Content-Type": "application/json"});
  res.end(JSON.stringify({foo: "none"}));
}
