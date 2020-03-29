require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

app.use('/', express.static(path.join(__dirname, 'client/build')));

app.listen(process.env.PORT || 80, () => console.log('ready'));