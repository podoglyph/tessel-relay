const tessel = require('tessel');

class LedsController {
  static toggleLed(req, res, next) {
    const index = req.params.ledId;

    if (index <= 3) {
        toggleSingleLed(index, req, res);
    } else if (index == 5) {
        upLeds(req, res);
    } else if (index == 6) {
        downLeds(req, res);
    } else {
        console.log("Something is amiss.")
    }

    function toggleSingleLed(index, req, res) {
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
  }
}

module.exports = LedsController;
