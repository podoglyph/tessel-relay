const express = require('express');
const app = express();
const router = express.Router();
const os = require('os');
const path = require('path');
const port = 8888;
const cors = require('cors');
const leds = require('./api/leds');
const camera = require('./api/camera');
const temperature = require('./api/temperature');

app.use(cors({origin: 'http://localhost:3000'}));
app.use('/leds', leds);
app.use('/camera', camera);
app.use('/temperature', temperature);

app.listen(port, function () {
  console.log(`http://${os.hostname()}.local:${port}`);
});
