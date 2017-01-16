const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const router = require('./router');

app.use(morgan('combined')); // use login framework as middleware in express (logs incoming requests)
app.use(bodyParser.json({type: '*/*'}));// parse http as json for logging


router(app);

const port = process.env.PORT || 3090;

const server = http.createServer(app);
server.listen(port);
console.log('Server listening on', port);