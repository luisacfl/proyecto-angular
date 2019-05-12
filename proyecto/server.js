'use strict'
const express = require('express');
const bodyParser = require('body-parser');

const dbConfig = require('./config/database.js');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// parse requests of content-type - application/json
app.use(bodyParser.json())

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.get('/', (req, res) => res.json({"mensaje":"Página funciona"}));
app.route('/home').get((req, res)=>res.json({"mensaje":"Página funciona"}));

// routes ======================================================================
const r = require('./src/app/routes.js');

// listen (start app with node server.js) ======================================
app.listen(port, ()=>console.log(`Example app listening on port ${port}! `));