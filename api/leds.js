const express = require('express')
const router = express.Router()
const tessel = require('tessel');
const LedsController = require('../lib/controllers/ledsController');

router.get('/:ledId', LedsController.toggleLed);

module.exports = router
