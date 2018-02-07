const express = require('express')
const router = express.Router()
const tessel = require('tessel');
const LedsController = require('../lib/controllers/ledsController');

router.get('/', function(req, res) {
  res.send('A homey page.');
});

router.get('/:ledId', LedsController.toggleLed);


// router.get('/:ledId', function (req, res) {
//   const index = req.params.ledId;
//
//   if (index <= 3) {
//     toggleLED(index, req, res);
//   } else if (index == 5) {
//       upLeds(req, res);
//   } else if (index == 6) {
//       downLeds(req, res);
//   } else {
//       console.log("Something is amiss.")
//   }
// })

function downLeds(req, res) {
  const leds = tessel.led;

  for (let i = 0; i < leds.length; i++) {
    leds[i].off();
  }

  if (res) {
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify({downStatus: "Set low!"}));
  }
};

function upLeds(req, res) {
  const leds = tessel.led;

  for (let i = 0; i < leds.length; i++) {
    leds[i].on();
  }

  res.writeHead(200, {"Content-Type": "application/json"});
  res.end(JSON.stringify({upStatus: "Set high!"}));
};

module.exports = router
