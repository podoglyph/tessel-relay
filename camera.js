const express = require('express');
const app = express();
const router = express.Router();
const os = require('os');
const path = require('path');
const port = 8888;
const cors =require('cors');
const leds = require('./api/leds')


app.use(express.static(path.join(__dirname, '/client')));
app.use(cors({origin: 'http://localhost:8080'}));
app.use('/leds', leds);

app.listen(port, function () {
  console.log(`http://${os.hostname()}.local:${port}`);
  console.log("All LEDS set to off!");
});
