'use strict'
let mongoose = require("mongoose");
const dbConfig = require('../config/database.js');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useFindAndModify: false
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});



//mongoose.set('useFindAndModify', false);

let db = mongoose.connection;

module.exports = {mongoose};
