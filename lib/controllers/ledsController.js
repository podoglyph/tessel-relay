// const Led = require('../models/Led');
const tessel = require('tessel');

class LedsController {
  static toggleLed(req, res, next) {
    const index = req.params.ledId;
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
}

module.exports = LedsController;
