const express = require('express');
const router = express.Router();
const path = require('path');
const av = require('tessel-av');
const camera = new av.Camera();

router.use(express.static(path.join(__dirname, './client')));

router.get('/', function(req, res) {
  res.redirect(camera.url);
});

module.exports = router
