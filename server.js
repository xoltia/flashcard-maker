require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) console.log(err);
    else console.log('connected to mongodb')
});

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json());
app.use('/api', require('./api'));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});
app.listen(process.env.PORT || 80, () => console.log('ready'));