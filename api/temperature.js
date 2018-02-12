const express = require('express');
const router = express.Router();
const path = require('path');
const tessel = require('tessel');
const pin = tessel.port.B.pin[7];

router.get('/', function(req, res) {
  getTemp(req, res)
});

function getTemp(req, res) {
  pin.analogRead((error, reading) => {
    if (error) {
      throw error;
    }

    let voltage = reading * 3.3;

    let temperatureC = (voltage - 0.5) * 100;

    let temperatureF = (temperatureC * 9.0 / 5.0) + 32.0;
    console.log("Reading:", reading);
    console.log("Volts:", voltage);
    console.log("Degrees C:", temperatureC);
    console.log("Degrees F", temperatureF);

    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify({
      degreesF: temperatureF,
      degreesC: temperatureC
    }));

  });
}

module.exports = router
