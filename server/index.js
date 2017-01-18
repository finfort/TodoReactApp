const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const router = require('./router');

mongoose.connect('mongodb://localhost/auth');

app.use(cors()); // limit to particular domain not for the whole world 

app.use(morgan('combined')); // use login framework as middleware in express (logs incoming requests)
app.use(bodyParser.json({type: '*/*'}));// parse http as json for logging


router(app);

const port = process.env.PORT || 3090;

const server = http.createServer(app);
server.listen(port);
console.log('Server listening on', port);