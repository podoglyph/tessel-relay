const express = require('express');
const app = express();
const fs = require('fs-plus');
const https = require('https');
const router = express.Router();
const os = require('os');
const path = require('path');
const cors = require('cors');
const leds = require('./api/leds');
const camera = require('./api/camera');
const temperature = require('./api/temperature');

app.use(cors({origin: '*'}));
app.use('/leds', leds);
app.use('/camera', camera);
app.use('/temperature', temperature);


https.createServer({
  key: fs.readFileSync(path.resolve(__dirname, './server.key')),
  cert: fs.readFileSync(__dirname + '/server.cert')
}, app)
.listen(8888, function () {
  console.log('Tessel API listening on port 8888!')
})

// const port = 8000;
// app.listen(port, function () {
//   console.log(`http://${os.hostname()}.local:${port}`);
// });
