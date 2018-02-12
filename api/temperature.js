const express = require('express');
const router = express.Router();
const path = require('path');
const sensorPin = require('tessel').port.A.pin.[0];

router.get('/', function(req, res) {
  // getTemp(req, res);
  console.log(req, res);
});

function getTemp(req, res) {

  let voltage = reading * 3.3;
  let voltage /= 1024.0;

  console.log("Volts:", voltage);

  let temperatureC = (voltage - 0.5) * 100;
  console.log("Degrees C:", temperatureC);

  let temperatureF = (temperatureC * 9.0 / 5.0) + 32.0;

  console.log("Degrees F", temperatureF);

  // set a delay of 1000ms
}

module.exports = router
